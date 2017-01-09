#!/usr/local/bin/bash

declare -A answers=(
    ["volcano"]="At a Volcano" ["castle"]="At a Castle"
               ["plane"]="On a Plane" ["rollercoaster"]="On a Roller Coaster"
               ["balloon"]="In a Hot Balloon"
               ["underwater"]="Under the Water"
               ["glacier"]="On the Glacier"
               ["boat"]="On a Boat"
               ["treehouse"]="In a Tree House"
               ["museum"]="In a Museum"
)

for ans in "${!answers[@]}";
do
    echo "$ans - ${answers[$ans]}";
    cp template.html $ans.html
    sed -i "s/xxxxx/$ans/g" $ans.html
    sed -i "s/yyyyyyyyy/${answers[$ans]}/g" $ans.html
done
