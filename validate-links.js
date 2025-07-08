#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const matter = require('gray-matter');
const { glob } = require('glob');

// Calculate Levenshtein distance between two strings
function levenshteinDistance(str1, str2) {
    const matrix = [];

    for (let i = 0; i <= str2.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
            if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }

    return matrix[str2.length][str1.length];
}

// Find the closest matching file
function findClosestMatch(targetPath, availableFiles) {
    let minDistance = Infinity;
    let closestMatch = null;

    // Extract just the filename without extension for comparison
    const targetName = path.basename(targetPath, path.extname(targetPath)).toLowerCase();

    for (const file of availableFiles) {
        const fileName = path.basename(file, '.md').toLowerCase();
        const distance = levenshteinDistance(targetName, fileName);

        if (distance < minDistance) {
            minDistance = distance;
            closestMatch = file;
        }
    }

    // Also check against full paths
    for (const file of availableFiles) {
        const distance = levenshteinDistance(targetPath.toLowerCase(), file.toLowerCase());

        if (distance < minDistance) {
            minDistance = distance;
            closestMatch = file;
        }
    }

    return closestMatch;
}

// Extract all markdown links from content
function extractMarkdownLinks(content) {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const links = [];
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
        const link = match[2];
        // Only process internal markdown links
        if (link.endsWith('.md') && !link.startsWith('http')) {
            links.push({
                full: match[0],
                text: match[1],
                path: link,
                index: match.index
            });
        }
    }

    return links;
}

// Extract all frontmatter link fields
function extractFrontmatterLinks(frontmatter) {
    const linkFields = [
        'parent_document',
        'child_documents',
        'related_documents',
        'cross_synthesis_with',
        'inspired_by',
        'has_inspired'
    ];

    const links = [];

    for (const field of linkFields) {
        if (frontmatter[field]) {
            if (Array.isArray(frontmatter[field])) {
                frontmatter[field].forEach((link, index) => {
                    if (link && typeof link === 'string' && link.endsWith('.md')) {
                        links.push({
                            field,
                            path: link,
                            isArray: true,
                            arrayIndex: index
                        });
                    }
                });
            } else if (typeof frontmatter[field] === 'string' && frontmatter[field].endsWith('.md')) {
                links.push({
                    field,
                    path: frontmatter[field],
                    isArray: false
                });
            }
        }
    }

    return links;
}

// Normalize path for comparison
function normalizePath(filePath, baseDir) {
    // Remove leading slash or ./
    let normalized = filePath.replace(/^\.?\//, '');

    // If path doesn't start with _posts/, add it
    if (!normalized.startsWith('_posts/')) {
        normalized = path.join('_posts', normalized);
    }

    // Ensure .md extension
    if (!normalized.endsWith('.md')) {
        normalized += '.md';
    }

    return normalized;
}

// Check if a file exists
async function fileExists(filePath) {
    try {
        await fs.access(filePath);
        return true;
    } catch {
        return false;
    }
}

// Process a single markdown file
async function processFile(filePath, availableFiles) {
    console.log(`\nProcessing: ${filePath}`);

    let content, parsed;
    
    try {
        content = await fs.readFile(filePath, 'utf-8');
        parsed = matter(content);
    } catch (error) {
        if (error.name === 'YAMLException') {
            console.log(`  ❌ YAML parsing error: ${error.message}`);
            console.log(`  ⚠️  Skipping file due to malformed frontmatter`);
            console.log(`  💡 Fix the YAML syntax in the frontmatter first`);
            return {
                file: filePath,
                fixes: [],
                modified: false,
                error: 'YAML parsing error'
            };
        }
        throw error; // Re-throw non-YAML errors
    }

    let modified = false;
    let updatedContent = content;
    const fixes = [];

    // Process frontmatter links
    const frontmatterLinks = extractFrontmatterLinks(parsed.data);

    for (const link of frontmatterLinks) {
        const normalizedPath = normalizePath(link.path, path.dirname(filePath));
        const exists = await fileExists(normalizedPath);

        if (!exists) {
            const closestMatch = findClosestMatch(link.path, availableFiles);

            if (closestMatch) {
                // Create relative path from _posts directory
                const relativePath = closestMatch.replace(/^_posts\//, '');

                console.log(`  ❌ Broken frontmatter link: ${link.field} -> ${link.path}`);
                console.log(`  ✅ Fixed with: ${relativePath}`);

                fixes.push({
                    type: 'frontmatter',
                    field: link.field,
                    old: link.path,
                    new: relativePath
                });

                // Update frontmatter
                if (link.isArray) {
                    parsed.data[link.field][link.arrayIndex] = relativePath;
                } else {
                    parsed.data[link.field] = relativePath;
                }

                modified = true;
            }
        }
    }

    // Process markdown links
    const markdownLinks = extractMarkdownLinks(parsed.content);
    let contentOffset = 0;

    for (const link of markdownLinks) {
        const normalizedPath = normalizePath(link.path, path.dirname(filePath));
        const exists = await fileExists(normalizedPath);

        if (!exists) {
            const closestMatch = findClosestMatch(link.path, availableFiles);

            if (closestMatch) {
                // Create relative path from _posts directory
                const relativePath = closestMatch.replace(/^_posts\//, '');

                console.log(`  ❌ Broken markdown link: [${link.text}](${link.path})`);
                console.log(`  ✅ Fixed with: ${relativePath}`);

                fixes.push({
                    type: 'markdown',
                    text: link.text,
                    old: link.path,
                    new: relativePath
                });

                // Replace in content
                const newLink = `[${link.text}](${relativePath})`;
                const startIndex = parsed.content.indexOf(link.full) + contentOffset;
                const endIndex = startIndex + link.full.length;

                parsed.content = parsed.content.substring(0, startIndex) +
                    newLink +
                    parsed.content.substring(endIndex);

                contentOffset += newLink.length - link.full.length;
                modified = true;
            }
        }
    }

    // Write back if modified
    if (modified) {
        updatedContent = matter.stringify(parsed.content, parsed.data);
        await fs.writeFile(filePath, updatedContent);
        console.log(`  💾 Saved ${fixes.length} fixes to ${filePath}`);
    } else {
        console.log(`  ✓ No broken links found`);
    }

    return {
        file: filePath,
        fixes,
        modified
    };
}

// Main function
async function validateAndFixLinks() {
    console.log('🔍 Markdown Link Validator and Fixer');
    console.log('====================================\n');

    try {
        // Get all markdown files in _posts
        const files = await glob('_posts/**/*.md');
        console.log(`Found ${files.length} markdown files in _posts/\n`);

        // Create a list of available files for matching
        const availableFiles = files.map(f => f);

        // Process each file
        const results = [];
        for (const file of files) {
            const result = await processFile(file, availableFiles);
            results.push(result);
        }

        // Summary
        console.log('\n\n📊 Summary');
        console.log('==========');

        const modifiedFiles = results.filter(r => r.modified);
        const errorFiles = results.filter(r => r.error);
        const totalFixes = results.reduce((sum, r) => sum + r.fixes.length, 0);

        console.log(`Total files processed: ${files.length}`);
        console.log(`Files with errors: ${errorFiles.length}`);
        console.log(`Files with broken links: ${modifiedFiles.length}`);
        console.log(`Total links fixed: ${totalFixes}`);
        if (errorFiles.length > 0) {
            console.log('\n❌ Files with errors:');
            errorFiles.forEach(r => {
                console.log(`  - ${r.file}: ${r.error}`);
            });
        }

        if (modifiedFiles.length > 0) {
            console.log('\n📝 Modified files:');
            modifiedFiles.forEach(r => {
                console.log(`  - ${r.file} (${r.fixes.length} fixes)`);
                r.fixes.forEach(fix => {
                    console.log(`    • ${fix.type}: ${fix.old} → ${fix.new}`);
                });
            });
        }

        // Create a report file
        const report = {
            timestamp: new Date().toISOString(),
            totalFiles: files.length,
            modifiedFiles: modifiedFiles.length,
            totalFixes: totalFixes,
            details: results.filter(r => r.modified)
        };

        await fs.writeFile(
            'link-validation-report.json',
            JSON.stringify(report, null, 2)
        );
        console.log('\n📄 Detailed report saved to: link-validation-report.json');

    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    validateAndFixLinks();
}

module.exports = {
    validateAndFixLinks,
    levenshteinDistance,
    findClosestMatch,
    extractMarkdownLinks,
    extractFrontmatterLinks
};