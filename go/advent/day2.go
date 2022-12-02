package advent

import (
	"fmt"
	"os"
	"strings"
)

func day2() {
	d2p1()
	d2p2()
}

const (
	rock     = 'R'
	paper    = 'P'
	scissors = 'S'
)

type Round struct {
	oppo rune
	me   rune
}

func d2p1() {
	in, err := os.ReadFile("../data/day2.txt")
	if err != nil {
		panic(err)
	}

	rounds := make([]Round, 0, len(in))
	for _, line := range strings.Split(string(in), "\n") {
		if len(line) == 0 { // skip empty lines
			continue
		}

		results := []rune(line)
		if results[0] == 'A' {
			results[0] = rock
		} else if results[0] == 'B' {
			results[0] = paper
		} else if results[0] == 'C' {
			results[0] = scissors
		}
		if results[2] == 'X' {
			results[2] = rock
		} else if results[2] == 'Y' {
			results[2] = paper
		} else if results[2] == 'Z' {
			results[2] = scissors
		}

		rounds = append(rounds, Round{oppo: results[0], me: results[2]})
	}

	totalScore := 0
	for _, round := range rounds {
		totalScore += _score(round.oppo, round.me)
	}

	fmt.Println(totalScore)
}

func d2p2() {
	in, err := os.ReadFile("../data/day2.txt")
	if err != nil {
		panic(err)
	}

	rounds := make([]Round, 0, len(in))
	for _, line := range strings.Split(string(in), "\n") {
		if len(line) == 0 { // skip empty lines
			continue
		}

		results := []rune(line)
		if results[0] == 'A' {
			results[0] = rock
		} else if results[0] == 'B' {
			results[0] = paper
		} else if results[0] == 'C' {
			results[0] = scissors
		}
		if results[2] == 'X' {
			if results[0] == rock {
				results[2] = scissors
			} else if results[0] == paper {
				results[2] = rock
			} else if results[0] == scissors {
				results[2] = paper
			}
		} else if results[2] == 'Y' {
			results[2] = results[0]
		} else if results[2] == 'Z' {
			if results[0] == rock {
				results[2] = paper
			} else if results[0] == paper {
				results[2] = scissors
			} else if results[0] == scissors {
				results[2] = rock
			}
		}

		rounds = append(rounds, Round{oppo: results[0], me: results[2]})
	}

	totalScore := 0
	for _, round := range rounds {
		totalScore += _score(round.oppo, round.me)
	}

	fmt.Println(totalScore)
}

func _score(oppo_play, my_play rune) (score int) {
	if oppo_play == my_play {
		score += 3
	} else if (my_play == rock && oppo_play == scissors) ||
		(my_play == paper && oppo_play == rock) ||
		(my_play == scissors && oppo_play == paper) {
		score += 6
	}

	if my_play == rock {
		score += 1
	} else if my_play == paper {
		score += 2
	} else if my_play == scissors {
		score += 3
	}

	return score
}
