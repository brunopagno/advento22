#!/bin/bash

DAY=(0 1 2)

cd data

for i in ${DAY[@]}
do
  echo ""
  echo "#### DAY $i ####"
  echo ""

  echo "Ruby!"

  cd ../ruby
  ruby advent.rb $i

  echo "---------"

  echo "Go!"
  cd ../go
  go run . $i
done

echo ""
echo "#### END ####"