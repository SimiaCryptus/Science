# _plugins/readme_index.rb
Jekyll::Hooks.register :site, :post_read do |site|
  # Find all README.md files in subdirectories
  Dir.glob(File.join(site.source, "**/README.md")).each do |readme_path|
    # Skip the root README.md
    next if File.dirname(readme_path) == site.source
    
    # Create index.md from README.md
    dir_path = File.dirname(readme_path)
    index_path = File.join(dir_path, "index.md")
    
    unless File.exist?(index_path)
      FileUtils.cp(readme_path, index_path)
    end
  end
end