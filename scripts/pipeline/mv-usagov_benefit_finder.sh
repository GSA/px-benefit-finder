#!/bin/bash

## Set the root directory in the pipeline
ROOT_DIR=$(git rev-parse --show-toplevel)

# BENEFIT_FINDER_MODULE
BENEFIT_FINDER_MODULE="usagov_benefit_finder"
readonly BENEFIT_FINDER_MODULE_LOCATION="${ROOT_DIR}/${BENEFIT_FINDER_MODULE}"

# USAGOV-2021 project
readonly USAGOV_PROJECT_LOCATION="${ROOT_DIR}/usagov-2021"
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
if test -d "$BENEFIT_FINDER_MODULE_LOCATION"
then
    echo "\xE2\x9C\x94 usa.gov benefit-finder module exist"
    echo "Moving BENEFIT_FINDER custom module to usa.gov project..."
    cp -r "${BENEFIT_FINDER_MODULE_LOCATION}" "${USAGOV_PROJECT_CUSTOM_MODULES_LOCATION}" || exit 1
    test -f "${USAGOV_PROJECT_CUSTOM_MODULES_LOCATION}${BENEFIT_FINDER_MODULE}"; echo -e "\xE2\x9C\x94 BENEFIT_FINDER Module successfully moved"
fi
