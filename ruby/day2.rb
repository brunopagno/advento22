require 'debug'

def day2
  p1
  p2
end

ROCK = 0
PAPER = 1
SCISSORS = 2

def p1
  input = File.read('../data/day2.txt')

  result = input
    .split("\n")
    .map do |line|
      oppo, me = line.split(' ')
      oppo = oppo.ord - 'A'.ord
      me = me.ord - 'X'.ord

      score(oppo, me)
    end
    .sum

  puts result
end

def p2
  input = File.read('../data/day2.txt')

  result = input
    .split("\n")
    .map do |line|
      oppo, me = line.split(' ')
      oppo = oppo.ord - 'A'.ord
      me = if me == 'X'
        (oppo - 1 + 3) % 3
      elsif me == 'Y'
        oppo
      elsif me == 'Z'
        (oppo + 1) % 3
      end

      score(oppo, me)
    end
    .sum

  puts result
end

def score(oppo, me)
  score = 0
  if oppo == me
    score += 3
  elsif (oppo + 1) % 3 == me
    score += 6
  end

  if me == ROCK
    score += 1
  elsif me == PAPER
    score += 2
  elsif me == SCISSORS
    score += 3
  end

  score
end