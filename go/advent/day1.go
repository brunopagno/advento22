package advent

import (
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
)

func day1() {
	d1p1()
	d1p2()
}

func d1p1() {
	input, err := os.ReadFile("../data/day1.txt")
	if err != nil {
		panic(err)
	}

	strPieces := strings.Split(string(input), "\n")

	elves := make([]int, 0, len(strPieces))
	group := make([]int, 0, len(strPieces))
	for _, item := range strPieces {
		if item == "" {
			total := 0
			for _, calories := range group {
				total += calories
			}
			elves = append(elves, total)
			group = nil
		} else {
			calories, err := strconv.Atoi(item)
			if err != nil {
				panic(err)
			}
			group = append(group, calories)
		}
	}

	max := -1
	for i := 0; i < len(elves); i++ {
		if elves[i] > max {
			max = elves[i]
		}
	}

	fmt.Println(max)
}

func d1p2() {
	input, err := os.ReadFile("../data/day1.txt")
	if err != nil {
		panic(err)
	}

	strPieces := strings.Split(string(input), "\n")

	elves := make([]int, 0, len(strPieces))
	group := make([]int, 0, len(strPieces))
	for _, item := range strPieces {
		if item == "" {
			total := 0
			for _, calories := range group {
				total += calories
			}
			elves = append(elves, total)
			group = nil
		} else {
			calories, err := strconv.Atoi(item)
			if err != nil {
				panic(err)
			}
			group = append(group, calories)
		}
	}

	sort.Ints(elves)

	total := 0
	for _, value := range elves[len(elves)-3:] {
		total += value
	}

	fmt.Println(total)
}
