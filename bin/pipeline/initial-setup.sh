#!/bin/bash

# get current directory
export SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
echo $SCRIPT_DIR
export CIRCLE_WORKFLOW=$( echo $CIRCLE_WORKFLOW_ID | cut -b -8 )

# echo "building the bears app in the same step"
# bash ./mv-bears-app.sh
# echo ".................."
# echo "moving the bears-app module into the usagov-2021 directory"
# mv  usagov_bears usagov-2021/web/modules/custom
# ls -l usagov-2021/web/modules/custom/