package advent

import (
	"brunopagno/adventofcode22/m/util"
	"fmt"
)

func day6() {
	d6p1()
	d6p2()
}

func d6p1() {
	signal := []rune(util.InputDataForDay(6))
	doTheThing(signal, 4)
}

func d6p2() {
	signal := []rune(util.InputDataForDay(6))
	doTheThing(signal, 14)
}

func doTheThing(signal []rune, size int) {
	packet := signal[0:size]
	result := -1
	for i := size; i < len(signal); i += 1 {
		if allUnique(packet) {
			result = i
			break
		}
		packet = append(packet[1:], signal[i])
	}

	fmt.Println(result)
}

func allUnique(s []rune) bool {
	seen := make(map[rune]bool)
	for _, r := range s {
		if seen[r] {
			return false
		}
		seen[r] = true
	}
	return true
}
