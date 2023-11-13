#!/bin/bash
# this file checks to ensure the same version of uswds from usagov is installed in our benefit-finder application

# get current directory
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

# define package file
readonly PROJECT_PACKAGE_CONFIG_FILE="package.json"

# benefit-finder app location
readonly BENEFIT_FINDER_PROJECT_LOCATION="${SCRIPT_DIR}/benefit-finder/themes/"

# USAGOV-2021 project
readonly USAGOV_PROJECT_LOCATION="${SCRIPT_DIR}/usagov-2021/"
readonly USAGOV_PROJECT_THEME_LOCATION="${USAGOV_PROJECT_LOCATION}web/themes/custom/usagov"
readonly USAGOV_PROJECT_THEME_DIR="${USAGOV_PROJECT_LOCATION}web/themes"


cd $USAGOV_PROJECT_THEME_LOCATION && npm install && npm run build
cp -r $USAGOV_PROJECT_THEME_DIR $BENEFIT_FINDER_PROJECT_LOCATION
