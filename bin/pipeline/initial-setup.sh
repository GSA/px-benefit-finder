#!/bin/bash

# get current directory
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
echo $SCRIPT_DIR

echo "cloning the repo and initiating the usagov-2021 submodule"
git clone -b "$CIRCLE_BRANCH" "$CIRCLE_REPOSITORY_URL"
cd px-bears-drupal
git submodule init
git submodule update
echo "building the bears app in the same step"
bash ./mv-bears-app.sh
echo ".................."
echo "moving the bears-app module into the usagov-2021 directory"
mv  usagov_bears usagov-2021/web/modules/custom
ls -l usagov-2021/web/modules/custom/