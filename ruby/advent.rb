# get param from command line
day = ARGV[0]

if day.nil?
  puts "Please provide a number as an argument"
  exit
end

require_relative "day#{day}.rb"
advent = method("day#{day}")

start = Time.now
advent.call
finish = Time.now

puts "#{(finish - start).round(3)}s [Ruby]"
