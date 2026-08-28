#!/usr/bin/env ruby
# frozen_string_literal: true

require 'set'

root = File.expand_path('..', __dir__)
link_files = Dir.chdir(root) { Dir['**/*.{yml,yaml,html,md}'] }

refs = []
link_files.each do |relative_path|
  full_path = File.join(root, relative_path)
  next unless File.file?(full_path)

  content = File.read(full_path, encoding: 'UTF-8')
  content.scan(/(?:url|pdf|href)\s*:\s*["']?([^"'\s>]+)/i) { |match| refs << match[0] }
  content.scan(/href=["']([^"']+)["']/i) { |match| refs << match[0] }
end

refs = refs.reject do |ref|
  ref.nil? || ref.empty? || ref.start_with?('http://', 'https://', 'mailto:', '#', 'javascript:', '/', 'data:')
end

missing = refs.uniq.filter_map do |ref|
  candidate = File.expand_path(ref, File.dirname(File.join(root, 'README.md')))
  next unless !File.exist?(candidate)

  ref
end

if missing.empty?
  puts 'All local document references resolve to existing files.'
  exit 0
end

puts 'Missing local document references:'
missing.sort.each { |ref| puts " - #{ref}" }
exit 1
