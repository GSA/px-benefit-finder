#!/bin/bash

# get current directory
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

# BEARS_APP
readonly BEARS_APP_LOCATION="${SCRIPT_DIR}/bears-app"
readonly BEARS_APP_BUILD_LOCATION="${BEARS_APP_LOCATION}/build"
readonly BEARS_APP_STATIC_FILE_LOCATION="${BEARS_APP_BUILD_LOCATION}/static"
readonly BEARS_APP_JS_FILE_NAME="/js/usagov-bears-app.min.js"
readonly BEARS_APP_JS_FILE="${BEARS_APP_STATIC_FILE_LOCATION}${BEARS_APP_JS_FILE_NAME}"
readonly BEARS_APP_CSS_FILE_NAME="/css/usagov-bears-app.min.css"
readonly BEARS_APP_CSS_FILE="${BEARS_APP_STATIC_FILE_LOCATION}${BEARS_APP_CSS_FILE_NAME}"
readonly BEARS_APP_MEDIA_DIRECTORY_NAME="/media"
readonly BEARS_APP_MEDIA_DIRECTORY="${BEARS_APP_STATIC_FILE_LOCATION}${BEARS_APP_MEDIA_DIRECTORY_NAME}"

# BEARS_MODULE
readonly BEARS_MODULE_LIBRARY_LOCATION="${SCRIPT_DIR}/usagov_bears/modules/usagov_bears_app/usagov_bears_page"
readonly BEARS_MODULE_JS_FILE_LOCATION="${BEARS_MODULE_LIBRARY_LOCATION}/js"
readonly BEARS_MODULE_CSS_FILE_LOCATION="${BEARS_MODULE_LIBRARY_LOCATION}/css"
readonly BEARS_MODULE_MEDIA_DIRECTORY_LOCATION="${BEARS_MODULE_LIBRARY_LOCATION}/media"

# check if bears application exist
if test -d "$BEARS_APP_LOCATION"; then
    echo "\xE2\x9C\x94 App directory exists"
    # build bears_app
    cd "${BEARS_APP_LOCATION}"
    echo -e "Building BEARS app..."
    npm ci
    npm run build
fi

# check if build file exist
if test -f "$BEARS_APP_JS_FILE"; then
    echo "\xE2\x9C\x94 App build file exist"
    echo "\xE2\x9C\x94 Build successfull"

    # check if bears custom module library directory exist
    if test -d "$BEARS_MODULE_JS_FILE_LOCATION"; then
        echo "\xE2\x9C\x94 Custom module directory exists"
        # move build file
        echo "Moving files to BEARS module library..."
        cp $BEARS_APP_JS_FILE $BEARS_MODULE_JS_FILE_LOCATION
        cp $BEARS_APP_CSS_FILE $BEARS_MODULE_CSS_FILE_LOCATION
        cp -r $BEARS_APP_MEDIA_DIRECTORY $BEARS_MODULE_LIBRARY_LOCATION
        test -f "${BEARS_MODULE_JS_FILE_LOCATION}${BEARS_APP_JS_FILE_NAME}"
        echo "\xE2\x9C\x94 JS build file successfully moved"
        test -f "${BEARS_MODULE_CSS_FILE_LOCATION}${BEARS_APP_CSS_FILE_NAME}"
        echo "\xE2\x9C\x94 CSS build file successfully moved"
        test -d "${BEARS_MODULE_MEDIA_DIRECTORY_LOCATION}"
        echo "\xE2\x9C\x94 Media files successfully moved"
    fi
fi
