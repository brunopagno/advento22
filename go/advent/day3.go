package advent

import (
	"brunopagno/adventofcode22/m/util"
	"fmt"
	"sort"
	"strings"
)

func day3() {
	d3p1()
	d3p2()
}

func d3p1() {
	in := util.InputDataForDay(3)

	result := 0
	for _, line := range strings.Split(in, "\n") {
		if line == "" {
			continue
		}

		items := []rune(line)
		half := len(items) / 2
		first := make(map[rune]int, half)
		second := make(map[rune]int, half)

		for i := 0; i < half; i++ {
			first[items[i]]++
		}
		for i := half; i < len(items); i++ {
			second[items[i]]++
		}

		for k, v := range first {
			if v > 0 && second[k] > 0 {
				result += checkPrio(k)
			}
		}
	}

	fmt.Println(result)
}

func d3p2() {
	in := util.InputDataForDay(3)

	result := 0

	// iterate lines 3 by 3
	elves := strings.Split(in, "\n")
	for i := 0; i < len(elves); i += 3 {
		if elves[i] == "" {
			continue
		}

		group := [3][]rune{[]rune(elves[i]), []rune(elves[i+1]), []rune(elves[i+2])}

		sort.Slice(group[0], func(i, j int) bool { return group[0][i] < group[0][j] })
		sort.Slice(group[1], func(i, j int) bool { return group[1][i] < group[1][j] })
		sort.Slice(group[2], func(i, j int) bool { return group[2][i] < group[2][j] })

		for {
			first := group[0][0]
			second := group[1][0]
			third := group[2][0]

			if first == second && second == third {
				result += checkPrio(first)
				break
			} else if first <= second && first <= third {
				group[0] = group[0][1:]
			} else if second <= first && second <= third {
				group[1] = group[1][1:]
			} else if third <= first && third <= second {
				group[2] = group[2][1:]
			}
		}
	}

	fmt.Println(result)
}

func checkPrio(item rune) int {
	if item >= 97 && item <= 122 { // a-z
		return int(item-'a') + 1
	} else { // A-Z
		return int(item-'A') + 27
	}
}
