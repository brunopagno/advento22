package advent

import (
	"brunopagno/adventofcode22/m/util"
	"fmt"
	"strings"
)

func day4() {
	d4p1()
	d4p2()
}

func d4p1() {
	in := util.InputDataForDay(4)

	total := 0
	for _, line := range strings.Split(string(in), "\n") {
		if line == "" {
			continue
		}

		var a [4]int
		fmt.Sscanf(line, "%d-%d,%d-%d", &a[0], &a[1], &a[2], &a[3])

		if d4RangeContains(a[0], a[1], a[2], a[3]) {
			total += 1
		}
	}

	fmt.Println(total)
}

func d4p2() {
	in := util.InputDataForDay(4)

	total := 0
	for _, line := range strings.Split(string(in), "\n") {
		if line == "" {
			continue
		}

		var a [4]int
		fmt.Sscanf(line, "%d-%d,%d-%d", &a[0], &a[1], &a[2], &a[3])

		if d4RangeOverlap(a[0], a[1], a[2], a[3]) {
			total += 1
		}
	}

	fmt.Println(total)
}

func d4RangeContains(fromA, toA, fromB, toB int) bool {
	return fromA <= fromB && toA >= toB || fromB <= fromA && toB >= toA
}

func d4RangeOverlap(fromA, toA, fromB, toB int) bool {
	return toA >= fromB && fromA <= toB || toB >= fromA && fromB <= toA
}
