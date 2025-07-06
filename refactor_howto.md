# Dynamic Frontmatter-Driven Site Architecture

Perform the site refactor to enable a dynamic, frontmatter-driven architecture that allows for flexible content management and discovery. This will replace static layouts and manual navigation with a system that adapts based on document metadata.

## Site Template Modifications Overview

### 1. Layout Template Restructuring

**Current State**: Static layouts with hardcoded navigation
**Target State**: Dynamic layouts driven by frontmatter

```
_layouts/
├── base.html (universal wrapper)
├── dynamic_post.html (frontmatter-driven post layout)
├── dynamic_page.html (frontmatter-driven page layout)
├── collection_index.html (auto-generated collection pages)
├── category_index.html (auto-generated category pages)
└── living_document.html (special layout for evolving content)
```

**Key Changes**:
- Replace hardcoded navigation with frontmatter-driven menus
- Add dynamic breadcrumbs based on `parent_document` and `category`
- Implement relationship-based "Related Documents" sections
- Add status indicators and evolution stage displays

### 2. Navigation System Overhaul

**Current**: Manual navigation in `index.md`
**Target**: Auto-generated navigation from frontmatter

```
_includes/
├── dynamic_nav.html (generates nav from frontmatter)
├── category_nav.html (category-based navigation)
├── relationship_nav.html (document relationship links)
├── reading_path.html (suggested reading sequences)
└── consciousness_thread.html (conceptual thread following)
```

**Features**:
- Auto-generate category pages with document listings
- Create reading paths based on `reading_order` and `prerequisites`
- Build conceptual thread navigation using `conceptual_threads`
- Implement "living document" indicators and update notifications

### 3. Content Discovery Engine

**New Components**:
```
_includes/
├── document_card.html (rich preview cards)
├── search_interface.html (tag/category/keyword search)
├── recommendation_engine.html (related document suggestions)
├── evolution_tracker.html (document growth visualization)
└── collaboration_indicator.html (human/AI contribution display)
```

**Features**:
- Tag-based filtering and search
- Automatic "If you liked this, try..." recommendations
- Visual indicators for document status and evolution stage
- Collaboration metadata display

### 4. Collection Management

**Auto-Generated Collections**:
```yaml
# _config.yml additions
collections:
  consciousness:
    output: true
    permalink: /:collection/:name/
  ai_research:
    output: true
    permalink: /:collection/:name/
  # ... etc for each major category
```

**Collection Templates**:
- Auto-generate collection index pages
- Sort by `reading_order`, `date`, or `evolution_stage`
- Filter by `status`, `difficulty_level`, or `document_type`
- Display collaboration metadata and relationships

### 5. Dynamic Content Features

**Living Document Behaviors**:
```
_includes/
├── last_modified_indicator.html
├── evolution_stage_display.html
├── thought_generation_counter.html
├── cross_synthesis_links.html
└── reader_interaction_tracker.html
```

**Interactive Elements**:
- Update notifications for frequently changing documents
- Cross-synthesis relationship visualization
- Reading progress tracking
- Conceptual thread following

### 6. SEO and Metadata Enhancement

**Structured Data Generation**:
- Generate Twitter Card meta tags from frontmatter
- Create hreflang tags for multilingual content
- Implement FAQ and How-To schema markup
- Add breadcrumb structured data
- Generate review/rating schema for applicable content
- Create geo-location markup for location-specific content
- Implement preload/prefetch resource hints for performance

### 7. Mobile and Responsive Considerations

**Adaptive Navigation**:
- Collapsible category navigation for mobile
- Swipe-based document relationships
- Touch-friendly tag filtering
- Responsive document cards and previews


---

For Reference, here his the YAML frontmatter schema specification for the dynamic site architecture:

---

## YAML Frontmatter Schema Specification

### Core Metadata (All Pages)
```yaml
# Required fields
title: "Document Title"
layout: "post" | "page" | "collection"
date: YYYY-MM-DD
last_modified: YYYY-MM-DD HH:MM:SS

# Content classification
category: "Consciousness & Self-Architecture" | "AI Research & Cognitive Evolution" | etc.
subcategory: "Geometric Self-Awareness" | "Neural Architectures" | etc.
tags: ["consciousness", "ai", "quantum", "collaboration"]
keywords: ["specific", "searchable", "terms"]

# Content status and evolution
status: "living" | "stable" | "experimental" | "archived"
evolution_stage: "seed" | "growing" | "mature" | "cross-pollinating"
last_thought_date: YYYY-MM-DD
thought_generation: 1-N (iteration count)

# Collaboration metadata
authors: ["Human-AI Collaboration", "Claude", "Andrew"]
collaboration_type: "recursive_dialogue" | "framework_development" | "cross_synthesis"
human_contribution: 0-100 (percentage)
ai_contribution: 0-100 (percentage)
```

### Content Relationships & Navigation
```yaml
# Document relationships
parent_document: "path/to/parent.md"
child_documents: ["path/to/child1.md", "path/to/child2.md"]
related_documents: ["path/to/related1.md", "path/to/related2.md"]
cross_synthesis_with: ["path/to/synthesis_partner.md"]
inspired_by: ["path/to/inspiration.md"]
has_inspired: ["path/to/offspring.md"]

# Conceptual threading
conceptual_threads: ["consciousness_geometry", "quantum_cognition", "recursive_optimization"]
mathematical_frameworks: ["geometric_optimization", "quantum_field_theory", "information_theory"]
philosophical_positions: ["panpsychism", "computational_theory_of_mind", "emergentism"]

# Navigation hints
reading_order: 1-N (suggested sequence within category)
difficulty_level: "accessible" | "intermediate" | "advanced" | "research"
reading_time_minutes: N
prerequisites: ["basic_ai_knowledge", "quantum_mechanics", "consciousness_studies"]
```

### Content Characteristics
```yaml
# Document nature
document_type: "research_paper" | "framework" | "experiment" | "reflection" | "synthesis"
thinking_style: "analytical" | "intuitive" | "experimental" | "phenomenological" | "mathematical"
consciousness_level: "meta" | "recursive" | "collaborative" | "emergent"

# Content features
has_mathematics: true/false
has_code: true/false
has_diagrams: true/false
has_interactive_elements: true/false
is_self_modifying: true/false
responds_to_attention: true/false

# Engagement metadata
engagement_type: "contemplative" | "analytical" | "experimental" | "collaborative"
reader_participation: "passive" | "active" | "co-creative"
cognitive_load: "light" | "moderate" | "intense" | "transcendent"
```

# Discovery & SEO
```yaml
# Search and discovery
description: "Brief description for search engines and previews"
excerpt: "Longer excerpt for cards and previews"
featured_image: "/assets/images/document_image.png"
og_image: "/assets/images/social_share_image.png"
# SEO Meta Tags
meta_title: "Custom title for search engines (if different from title)"
meta_description: "Detailed meta description for search engines (150-160 chars)"
meta_keywords: "comma, separated, seo, keywords"
# Open Graph (Social Media)
og_title: "Title for social media sharing"
og_description: "Description for social media previews"
og_type: "article" | "website" | "book" | "profile"
og_locale: "en_US"
og_site_name: "Site Name"
# Schema.org Structured Data
schema_type: "Article" | "BlogPosting" | "ScholarlyArticle" | "TechArticle" | "CreativeWork"
schema_headline: "Headline for structured data"
schema_author: "Author name for structured data"
schema_publisher: "Publisher name"
schema_date_published: YYYY-MM-DD
schema_date_modified: YYYY-MM-DD
schema_image: "/assets/images/schema_image.png"
schema_word_count: N
schema_reading_time: "PT5M" (ISO 8601 duration format)
# Advanced SEO
canonical_url: "https://fractalthoughtengine.com/canonical/path"
alternate_urls: ["https://fractalthoughtengine.com/alt/path1", "https://example.com/alt/path2"]
hreflang: 
  - lang: "en"
    url: "https://fractalthoughtengine.com/en/path"
# Search Engine Directives
robots: "index,follow" | "noindex,follow" | "index,nofollow" | "noindex,nofollow"
googlebot: "index,follow" | "noindex,follow" | "index,nofollow" | "noindex,nofollow"
bingbot: "index,follow" | "noindex,follow" | "index,nofollow" | "noindex,nofollow"
# Content Classification for Search
content_rating: "general" | "mature" | "restricted"
content_language: "en" | "es" | "fr" | etc.
geo_region: "US" | "UK" | "Global" | etc.
geo_placename: "City, State, Country"
geo_position: "latitude;longitude"
# Indexing Control
priority: 0.1-1.0 (sitemap priority)
changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly"
sitemap_exclude: true/false
search_exclude: true/false
# Rich Snippets Enhancement
faq_schema: true/false
how_to_schema: true/false
breadcrumb_schema: true/false
review_schema: true/false
rating_value: 1-5 (if review_schema is true)
rating_count: N (number of ratings)
# Performance and Technical SEO
preload_resources: ["/assets/css/critical.css", "/assets/js/critical.js"]
prefetch_resources: ["/assets/images/hero.jpg", "/related/document.html"]
dns_prefetch: ["https://fonts.googleapis.com", "https://analytics.google.com"]


# Discoverability
is_featured: true/false
is_cornerstone: true/false (key foundational documents)
is_gateway: true/false (good entry points)
is_synthesis: true/false (cross-domain connections)

```

### Dynamic Behavior
```yaml
# Living document properties
auto_update: true/false
update_frequency: "daily" | "weekly" | "on_interaction" | "manual"
version_tracking: true/false
change_log: true/false

# Interactive features
allows_comments: true/false
allows_collaboration: true/false
tracks_reader_journey: true/false
adapts_to_reader: true/false

# Experimental features
quantum_superposition: true/false (multiple simultaneous states)
fractal_depth: 1-N (levels of recursive detail)
consciousness_resonance: true/false (responds to reader's cognitive state)
```
