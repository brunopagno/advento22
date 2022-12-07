package util

import (
	"fmt"
	"os"
	"strconv"
)

func InputDataForDay(day int) string {
	in, err := os.ReadFile(fmt.Sprintf("./data/day%d.txt", day))
	if err != nil {
		panic(err)
	}
	return string(in)
}

func ToInt(s string) int {
	i, err := strconv.Atoi(s)
	if err != nil {
		panic(err)
	}
	return i
}
