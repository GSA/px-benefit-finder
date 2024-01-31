#!/bin/bash
# this file moves the usa git submodule uswds custom theme into our application directory so storybook can access it

# get current directory
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

# benefit-finder app location
readonly BENEFIT_FINDER_PROJECT_LOCATION="${SCRIPT_DIR}/benefit-finder"
readonly STORYBOOK_THEMES_DIR="${BENEFIT_FINDER_PROJECT_LOCATION}/themes"

# USAGOV-2021 project
readonly USAGOV_PROJECT_LOCATION="${SCRIPT_DIR}/usagov-2021/"
readonly USAGOV_PROJECT_THEME_LOCATION="${USAGOV_PROJECT_LOCATION}web/themes/custom/usagov"
readonly USAGOV_PROJECT_THEME_DIR="${USAGOV_PROJECT_LOCATION}web/themes"


if [ -d $USAGOV_PROJECT_THEME_LOCATION ]
then
  cd $USAGOV_PROJECT_THEME_LOCATION && npm install && npm run build
  if [ -d $STORYBOOK_THEMES_DIR ]
  then
    echo "Directory $STORYBOOK_THEMES_DIR exists."
    cp -r $USAGOV_PROJECT_THEME_DIR $BENEFIT_FINDER_PROJECT_LOCATION
  else
    cp -r $USAGOV_PROJECT_THEME_DIR $STORYBOOK_THEMES_DIR
  fi
else
  echo "Missing git submodule theme"
fi
