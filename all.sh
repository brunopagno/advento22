#!/bin/bash

DAY=$1

echo "Ruby!"

cd ruby
ruby advent.rb $DAY

echo "NodeJS!"
cd ../nodejs
npm run advent $DAY

echo "Go!"
cd ../go
go run . $DAY
