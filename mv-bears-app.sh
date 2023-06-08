#!/bin/bash

# get current directory
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

# BEARS_APP
readonly BEARS_APP_LOCATION="${SCRIPT_DIR}/bears-app"
readonly BEARS_APP_BUILD_LOCATION="${BEARS_APP_LOCATION}/build"
readonly BEARS_APP_JS_FILE_LOCATION="${BEARS_APP_BUILD_LOCATION}/static/js/"
readonly BEARS_APP_JS_FILE_NAME="usagov-bears-app.min.js"
readonly BEARS_APP_JS_FILE="${BEARS_APP_JS_FILE_LOCATION}${BEARS_APP_JS_FILE_NAME}"

# BEARS_MODULE
readonly BEARS_MODULE_LIBRARY_LOCATION="${SCRIPT_DIR}/usagov_bears/modules/usagov_bears_app/usagov_bears_block"
readonly BEARS_MODULE_JS_FILE_LOCATION="${BEARS_MODULE_LIBRARY_LOCATION}/js"

# check if bears application exist
if test -d "$BEARS_APP_LOCATION"; then
    echo -e "\xE2\x9C\x94 App directory exists"
    # build bears_app
    cd "${BEARS_APP_LOCATION}"
    echo -e "Building BEARS app..."
    npm ci
    npm run build
fi

# check if build file exist
if test -f "$BEARS_APP_JS_FILE"; then
    echo -e "\xE2\x9C\x94 App build file exist"
    echo -e "\xE2\x9C\x94 Build successfull"

    # check if bears custom module library directory exist
    if test -d "$BEARS_MODULE_JS_FILE_LOCATION"; then
        echo -e "\xE2\x9C\x94 Custom module directory exists"
        # move build file
        echo -e "Moving file to BEARS module library..."
        cp $BEARS_APP_JS_FILE $BEARS_MODULE_JS_FILE_LOCATION
        test -f "${BEARS_MODULE_JS_FILE_LOCATION}${BEARS_APP_JS_FILE_NAME}"; echo -e "\xE2\x9C\x94 File successfully moved"
    fi
fi
