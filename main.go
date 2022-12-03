package main

import (
	"brunopagno/adventofcode22/m/advent"
	"fmt"
	"os"
	"time"
)

func main() {
	if len(os.Args) < 2 {
		fmt.Println("Please provide a number as an argument")
		os.Exit(1)
	}

	day := os.Args[1]

	before := time.Now()
	advent.Day(day)
	after := time.Now()

	fmt.Printf("%fs [Go]", after.Sub(before).Seconds())
	fmt.Println()
}
