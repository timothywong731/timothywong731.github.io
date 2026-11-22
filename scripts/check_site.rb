# Run after a production Jekyll build: ruby scripts/check_site.rb [build_directory]
require 'yaml'
require 'nokogiri'
require 'date'
require 'digest'

destination = ARGV.fetch(0, '_site')
config = YAML.safe_load(File.read('_config.yml'), aliases: true)
home = Nokogiri::HTML(File.read(File.join(destination, 'index.html')))
links = home.css('.author__urls a').map { |link| link['href'] }
raise 'Missing social profile links' unless (config.dig('social', 'links') - links).empty?
raise 'Missing uploaded headshot' unless home.at_css('img[src$="/images/photo.png"]')
%w[assets/css/main.css assets/css/fontawesome.css assets/js/main.min.js assets/js/gallery.js images/photo.png].each do |asset|
  raise "Missing asset: #{asset}" unless File.size?(File.join(destination, asset))
end

count = 0
config.fetch('collections').each do |collection, settings|
  next unless settings['output']
  Dir.glob("_#{collection}/*.{md,html}").each do |source|
    metadata = YAML.safe_load(File.read(source).split(/^---\s*$\n?/)[1], permitted_classes: [Date, Time], aliases: true)
    url = metadata['permalink'] || "/#{collection}/#{File.basename(source, '.*')}/"
    path = File.join(destination, url.sub(%r{^/}, ''))
    path = File.join(path, 'index.html') if url.end_with?('/')
    path += '.html' unless File.file?(path)
    page = Nokogiri::HTML(File.read(path))
    raise "Missing title: #{source}" unless page.at_css('h1')&.text&.strip == metadata.fetch('title').strip
    raise "Missing profile: #{source}" unless page.at_css('.author__avatar img') && (config.dig('social', 'links') - page.css('.author__urls a').map { |link| link['href'] }).empty?
    count += 1
  end
end

raise 'Uploaded photo was modified by the build' unless Digest::SHA256.file('images/photo.png').hexdigest == Digest::SHA256.file(File.join(destination, 'images/photo.png')).hexdigest
%w[talks publications patents tutorials teaching].each do |collection|
  section = Nokogiri::HTML(File.read(File.join(destination, collection, 'index.html')))
  items = section.css('.work-list .work-item')
  expected_dates = Dir.glob("_#{collection}/*.md").map do |source|
    YAML.safe_load(File.read(source).split(/^---\s*$\n?/)[1], permitted_classes: [Date, Time])['date'].iso8601
  end.sort.reverse
  raise "Incorrect order or missing items: #{collection}" unless items.map { |item| item['data-date'] } == expected_dates
  raise "Year groups remain: #{collection}" unless section.css('.work-year').empty?
  if %w[tutorials teaching].include?(collection)
    raise "Expected titles only: #{collection}" unless items.all? { |item| item.text.strip == item.at_css('a').text.strip }
  end
end
projects = Nokogiri::HTML(File.read(File.join(destination, 'projects', 'index.html')))
raise 'Missing project tiles' unless projects.css('.tile').size == Dir.glob('_projects/*.md').size
projects.css('.tile').each do |tile|
  image = tile.at_css('.tile__media img')
  raise 'Project tile has no thumbnail' unless image && File.file?(File.join(destination, image['src'].sub(%r{^/}, '')))
end
puts "Checked #{count} collection pages, #{links.size} profile links, deployed assets and the uploaded photo."
