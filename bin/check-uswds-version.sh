#!/bin/bash
# this file checks to ensure the same version of uswds from usagov is installed in our usagov_benefit_finder application

# get current directory
EXEC_DIR=$(pwd)
echo "current location ${EXEC_DIR}"

# define package file
readonly PROJECT_PACKAGE_CONFIG_FILE="package.json"

# usagov_BENEFIT_FINDER_ location
readonly BENEFIT_FINDER_PROJECT_LOCATION="${EXEC_DIR}/benefit-finder/"

# USAGOV-2021 project
readonly USAGOV_PROJECT_LOCATION="${EXEC_DIR}/usagov-2021/"
readonly USAGOV_PROJECT_THEME_LOCATION="${USAGOV_PROJECT_LOCATION}web/themes/custom/usagov/"

if test ! -d "${USAGOV_PROJECT_THEME_LOCATION}${PROJECT_PACKAGE_CONFIG_FILE}"
then
    echo "\xE2\x9C\x94 usa.gov package config file exist"
    USAGOV_PACKAGE="${USAGOV_PROJECT_THEME_LOCATION}${PROJECT_PACKAGE_CONFIG_FILE}"

    if test ! -d "${BENEFIT_FINDER_PROJECT_LOCATION}${PROJECT_PACKAGE_CONFIG_FILE}"
    then
        echo "\xE2\x9C\x94 BENEFIT_FINDER package config file exist"
        BENEFIT_FINDER_PACKAGE="${BENEFIT_FINDER_PROJECT_LOCATION}${PROJECT_PACKAGE_CONFIG_FILE}"
        BENEFIT_FINDER_USWDS=$(grep "@uswds/uswds" $BENEFIT_FINDER_PACKAGE | grep -o "[0-9]*\.[0-9]*\.[0-9]")
        USAGOV_USWDS=$(grep "@uswds/uswds" $USAGOV_PACKAGE | grep -o "[0-9]*\.[0-9]*\.[0-9]")
        echo "BENEFIT_FINDER uswds version ${BENEFIT_FINDER_USWDS}"
        echo "USAGOV uswds version ${USAGOV_USWDS}"
        if [[ $BENEFIT_FINDER_USWDS == $USAGOV_USWDS ]]
        then
            echo "version match"
        else
            echo "versions do not match, updating uswds package"
            cd $BENEFIT_FINDER_PROJECT_LOCATION
            # install the matched version of uswds
            echo "@uswds/uswds@$USAGOV_USWDS"
            npm install -D "@uswds/uswds@$USAGOV_USWDS"
            echo "BENEFIT_FINDER uswds version ${BENEFIT_FINDER_USWDS}"
        fi
    fi
fi


