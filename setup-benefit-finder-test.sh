#!/bin/bash

# get current directory
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

# BENEFIT_FINDER_TESTS
BENEFIT_FINDER_TESTS="tests"
readonly BENEFIT_FINDER_TESTS_LOCATION="${SCRIPT_DIR}/${BENEFIT_FINDER_TESTS}"

# USAGOV-2021 project
readonly USAGOV_PROJECT_LOCATION="${SCRIPT_DIR}/usagov-2021"

# Copy PHPUnit configuration file
cp -r ${BENEFIT_FINDER_TESTS_LOCATION}/phpunit.xml ${USAGOV_PROJECT_LOCATION}/phpunit.xml

cd ${USAGOV_PROJECT_LOCATION}

# Install testing software
bin/composer require --dev drupal/core-dev
bin/composer require --dev phpunit/phpunit
bin/composer require --dev behat/mink
bin/composer require --dev behat/mink-browserkit-driver
bin/composer require --dev behat/mink-selenium2-driver
bin/composer require --dev weitzman/drupal-test-traits
bin/composer dump-autoload
