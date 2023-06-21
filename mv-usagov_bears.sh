#!/bin/bash

# get current directory
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

# BEARS_MODULE
BEARS_MODULE="usagov_bears"
readonly BEARS_MODULE_LOCATION="${SCRIPT_DIR}/${BEARS_MODULE}"

# USAGOV-2021 project
readonly USAGOV_PROJECT_LOCATION="${SCRIPT_DIR}/usagov-2021"
readonly USAGOV_PROJECT_CUSTOM_MODULES_LOCATION="${USAGOV_PROJECT_LOCATION}/web/modules/custom"

# check if usagov-2021 custom modules directory exist
if test ! -d "$USAGOV_PROJECT_CUSTOM_MODULES_LOCATION"
then
    echo "\xE2\x9C\x94 usa.gov project directory does not exists, initializing submodule"
    # init submodule
    git submodule init
    git submodule update
else
    echo "\xE2\x9C\x94 usa.gov project directory exists, updating submodule"
    git pull --recurse-submodules
fi

# check if module directory exist
if test -d "$BEARS_MODULE_LOCATION"
then
    echo "\xE2\x9C\x94 usa.gov bears module exist"
    echo "Moving BEARS custom module to usa.gov project..."
    cp -r $BEARS_MODULE_LOCATION $USAGOV_PROJECT_CUSTOM_MODULES_LOCATION
    test -f "${USAGOV_PROJECT_CUSTOM_MODULES_LOCATION}${BEARS_MODULE}"; echo -e "\xE2\x9C\x94 BEARS Module successfully moved"
fi
