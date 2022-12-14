package advent

import (
	"brunopagno/adventofcode22/m/util"
	"fmt"
	"strconv"
	"strings"
)

func day0() {
	d0p1()
	d0p2()
}

func d0p1() {
	in := util.InputDataForDay(0)

	prev := -1
	count := 0
	for _, line := range strings.Split(in, "\n") {
		el, err := strconv.Atoi(line)
		if err != nil { // skip blank lines
			continue
		}
		if prev >= 0 && prev < el {
			count += 1
		}
		prev = el
	}

	fmt.Printf("The result is [%d]", count)
	fmt.Println()
}

func d0p2() {
	in := util.InputDataForDay(0)

	raw := strings.Split(in, "\n")
	ee := make([]int, len(raw))
	for i, v := range raw {
		el, err := strconv.Atoi(v)
		if err != nil { // skip blank lines
			continue
		}
		ee[i] = el
	}

	count := 0
	for i := 0; i < len(ee)-3; i++ {
		if (ee[i] + ee[i+1] + ee[i+2]) < ee[i+1]+ee[i+2]+ee[i+3] {
			count += 1
		}
	}

	fmt.Printf("The result is [%d]", count)
	fmt.Println()
}
