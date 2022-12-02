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
	rock     = 0
	paper    = 1
	scissors = 2
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

	roundLines := strings.Split(string(in), "\n")
	rounds := make([]Round, 0, len(roundLines))
	for _, line := range roundLines {
		if len(line) == 0 { // skip empty lines
			continue
		}

		results := []rune(line)
		rounds = append(rounds, Round{oppo: (results[0] - 'A'), me: (results[2] - 'X')})
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
		results[0] -= 'A'

		if results[2] == 'X' {
			results[2] = (results[0] - 1 + 3) % 3
		} else if results[2] == 'Y' {
			results[2] = results[0]
		} else if results[2] == 'Z' {
			results[2] = (results[0] + 1) % 3
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
	} else if (oppo_play+1)%3 == my_play {
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
