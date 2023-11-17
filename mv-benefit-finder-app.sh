#!/bin/bash

# get current directory
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

# BENEFIT_FINDER
readonly BENEFIT_FINDER_LOCATION="${SCRIPT_DIR}/benefit-finder"
readonly BENEFIT_FINDER_BUILD_LOCATION="${BENEFIT_FINDER_LOCATION}/build"
readonly BENEFIT_FINDER_STATIC_FILE_LOCATION="${BENEFIT_FINDER_BUILD_LOCATION}/static"
readonly BENEFIT_FINDER_JS_FILE_NAME="/js/benefit-finder.min.js"
readonly BENEFIT_FINDER_JS_FILE="${BENEFIT_FINDER_STATIC_FILE_LOCATION}${BENEFIT_FINDER_JS_FILE_NAME}"
readonly BENEFIT_FINDER_CSS_FILE_NAME="/css/benefit-finder.min.css"
readonly BENEFIT_FINDER_CSS_FILE="${BENEFIT_FINDER_STATIC_FILE_LOCATION}${BENEFIT_FINDER_CSS_FILE_NAME}"
readonly BENEFIT_FINDER_MEDIA_DIRECTORY_NAME="/media"
readonly BENEFIT_FINDER_MEDIA_DIRECTORY="${BENEFIT_FINDER_STATIC_FILE_LOCATION}${BENEFIT_FINDER_MEDIA_DIRECTORY_NAME}"

# BENEFIT_FINDER_MODULE
readonly BENEFIT_FINDER_MODULE_LIBRARY_LOCATION="${SCRIPT_DIR}/usagov_benefit_finder/modules/usagov_benefit_finder_app/usagov_benefit_finder_page"
readonly BENEFIT_FINDER_MODULE_JS_FILE_LOCATION="${BENEFIT_FINDER_MODULE_LIBRARY_LOCATION}/js"
readonly BENEFIT_FINDER_MODULE_CSS_FILE_LOCATION="${BENEFIT_FINDER_MODULE_LIBRARY_LOCATION}/css"
readonly BENEFIT_FINDER_MODULE_MEDIA_DIRECTORY_LOCATION="${BENEFIT_FINDER_MODULE_LIBRARY_LOCATION}/media"

# check if benefit-finder application exist
if test -d "$BENEFIT_FINDER_LOCATION"; then
    echo "\xE2\x9C\x94 App directory exists"
    # build benefit_finder_app
    cd "${BENEFIT_FINDER_LOCATION}"
    echo -e "Building BENEFIT_FINDER app..."
    npm ci
    npm run build
fi

# check if build file exist
if test -f "$BENEFIT_FINDER_JS_FILE"; then
    echo "\xE2\x9C\x94 App build file exist"
    echo "\xE2\x9C\x94 Build successfull"

    # check if benefit-finder custom module library directory exist
    if test -d "$BENEFIT_FINDER_MODULE_JS_FILE_LOCATION"; then
        echo "\xE2\x9C\x94 Custom module directory exists"
        # move build file
        echo "Moving files to BENEFIT_FINDER module library..."
        cp $BENEFIT_FINDER_JS_FILE $BENEFIT_FINDER_MODULE_JS_FILE_LOCATION
        cp $BENEFIT_FINDER_CSS_FILE $BENEFIT_FINDER_MODULE_CSS_FILE_LOCATION
        echo "echoing benefit finder medie directory $BENEFIT_FINDER_MEDIA_DIRECTORY "
        echo "echoing benefit finder module library location $BENEFIT_FINDER_MODULE_LIBRARY_LOCATION"
        pwd
        ls -l $BENEFIT_FINDER_MEDIA_DIRECTORY
        cp -r $BENEFIT_FINDER_MEDIA_DIRECTORY $BENEFIT_FINDER_MODULE_LIBRARY_LOCATION
        test -f "${BENEFIT_FINDER_MODULE_JS_FILE_LOCATION}${BENEFIT_FINDER_JS_FILE_NAME}"
        echo "\xE2\x9C\x94 JS build file successfully moved"
        test -f "${BENEFIT_FINDER_MODULE_CSS_FILE_LOCATION}${BENEFIT_FINDER_CSS_FILE_NAME}"
        echo "\xE2\x9C\x94 CSS build file successfully moved"
        test -d "${BENEFIT_FINDER_MODULE_MEDIA_DIRECTORY_LOCATION}"
        echo "\xE2\x9C\x94 Media files successfully moved"
    fi
fi
