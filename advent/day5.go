package advent

import (
	"brunopagno/adventofcode22/m/util"
	"fmt"
	"strings"
)

func day5() {
	d5p1()
	d5p2()
}

func d5p1() {
	in := util.InputDataForDay(5)
	lines := strings.Split(in, "\n")

	// crates setup
	crates := make([][]rune, 9)
	for i := 0; i < 9; i++ {
		crates[i] = []rune(strings.Split(lines[i], "-")[1])
	}

	for i := 10; i < len(lines); i++ {
		if len(lines[i]) == 0 {
			continue
		}
		var amount, from, to int
		_, err := fmt.Sscanf(lines[i], "move %d from %d to %d", &amount, &from, &to)
		if err != nil {
			panic(err)
		}
		from -= 1
		to -= 1

		for j := 0; j < amount; j++ {
			crates[to] = append(crates[to], crates[from][len(crates[from])-1])
			crates[from] = crates[from][:len(crates[from])-1]
		}
	}

	for i := 0; i < 9; i++ {
		fmt.Printf("%d: %s ", i+1, string(crates[i]))
	}
	fmt.Println()
}

func d5p2() {
	in := util.InputDataForDay(5)
	lines := strings.Split(in, "\n")

	// crates setup
	crates := make([][]rune, 9)
	for i := 0; i < 9; i++ {
		crates[i] = []rune(strings.Split(lines[i], "-")[1])
	}

	for i := 10; i < len(lines); i++ {
		if len(lines[i]) == 0 {
			continue
		}
		var amount, from, to int
		_, err := fmt.Sscanf(lines[i], "move %d from %d to %d", &amount, &from, &to)
		if err != nil {
			panic(err)
		}
		from -= 1
		to -= 1

		crates[to] = append(crates[to], crates[from][len(crates[from])-amount:]...)
		crates[from] = crates[from][:len(crates[from])-amount]
	}

	for i := 0; i < 9; i++ {
		fmt.Printf("%d: %s ", i+1, string(crates[i]))
	}
	fmt.Println()
}
