def day0
  1000.times do
    p1
    p2
  end
end

def p1
  data = File.read('../data/day0.txt')

  prev = -1
  count = 0
  data.split("\n") do |el|
    el = el.to_i
    if prev >= 0 && prev < el
      count += 1
    end
    prev = el
  end

  # puts "Part 1: #{count}"
end

def p2
  data = File.read('../data/day0.txt')

  ee = []
  data.split("\n").each.with_index do |el, i|
    ee[i] = el.to_i
  end

  count = 0
  for i in 0..(ee.length - 4)
    if (ee[i] + ee[i + 1] + ee[i + 2]) < (ee[i + 1] + ee[i + 2] + ee[i + 3])
      count += 1
    end
  end

  # puts "Part 2: #{count}"
end
