#!/bin/bash
# this file checks to ensure the same version of uswds from usagov is installed in our bears application

# get current directory
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

# define package file
readonly PROJECT_PACKAGE_CONFIG_FILE="package.json"

# bears app location
readonly BEARS_PROJECT_LOCATION="${SCRIPT_DIR}/bears-app/"

# USAGOV-2021 project
readonly USAGOV_PROJECT_LOCATION="${SCRIPT_DIR}/usagov-2021/"
readonly USAGOV_PROJECT_THEME_LOCATION="${USAGOV_PROJECT_LOCATION}web/themes/custom/usagov/"

if test ! -d "${USAGOV_PROJECT_THEME_LOCATION}${PROJECT_PACKAGE_CONFIG_FILE}"
then
    echo "\xE2\x9C\x94 usa.gov package config file exist"
    USAGOV_PACKAGE="${USAGOV_PROJECT_THEME_LOCATION}${PROJECT_PACKAGE_CONFIG_FILE}"

    if test ! -d "${BEARS_PROJECT_LOCATION}${PROJECT_PACKAGE_CONFIG_FILE}"
    then
        echo "\xE2\x9C\x94 BEARS package config file exist"
        BEARS_PACKAGE="${BEARS_PROJECT_LOCATION}${PROJECT_PACKAGE_CONFIG_FILE}"
        BEARS_USWDS=$(grep "@uswds/uswds" $BEARS_PACKAGE | grep -o "[0-9]*\.[0-9]*\.[0-9]")
        USAGOV_USWDS=$(grep "@uswds/uswds" $USAGOV_PACKAGE | grep -o "[0-9]*\.[0-9]*\.[0-9]")
        echo "BEARS uswds version ${BEARS_USWDS}"
        echo "USAGOV uswds version ${USAGOV_USWDS}"
        if [[ $BEARS_USWDS == $USAGOV_USWDS ]]
        then
            echo "version match"
        else
            echo "versions do not match, updating uswds package"
            cd $BEARS_PROJECT_LOCATION
            # install the matched version of uswds
            echo "@uswds/uswds@$USAGOV_USWDS"
            npm install -D "@uswds/uswds@$USAGOV_USWDS"
            echo "BEARS uswds version ${BEARS_USWDS}"
        fi
    fi
fi


