#!/bin/bash

DAY=$1

echo "Running day $DAY"

echo "---------"

echo "Ruby!"

cd ruby
ruby advent.rb $DAY

echo "---------"

echo "Go!"
cd ../go
go run . $DAY

echo "---------"

echo "Finished!"