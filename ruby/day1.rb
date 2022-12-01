require 'debug'

def day1
  p1
  p2
end

def p1
  input = File.read('../data/day1.txt')
  
  result = input
    .split("\n")
    .chunk { |l| l.length == 0 }
    .map { |_, group| group.map(&:to_i).sum }
    .max
  puts result
end

def p2
  input = File.read('../data/day1.txt')
  
  result = input
    .split("\n")
    .chunk { |l| l.length == 0 }
    .map { |_, group| group.map(&:to_i).sum }
    .sort
    .last(3)
    .sum
  puts result
end
