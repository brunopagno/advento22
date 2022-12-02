package util

import (
	"fmt"
	"os"
)

func InputDataForDay(day int) string {
	in, err := os.ReadFile(fmt.Sprintf("../data/day%d.txt", day))
	if err != nil {
		panic(err)
	}
	return string(in)
}
