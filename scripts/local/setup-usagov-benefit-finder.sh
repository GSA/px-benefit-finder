#!/bin/bash

# Set the root directory
ROOT_DIR=$(git rev-parse --show-toplevel)

# usagov-2021 project
USAGOV_PROJECT_LOCATION="${ROOT_DIR}/usagov-2021"
SCRIPTS_LOCATION="${ROOT_DIR}/scripts/pipeline"


# make specific to usagov
for param in "$@"; do
  # stop and remove any old docker stuff if --rebuild flag is passed
    if [ "$param" = "--rebuild" ]; then
        echo "Parameter found: ${param}"
        echo "destroying all usagov-2021 containers"
        docker stop "$(docker ps -aq)"
        docker rmi "$(docker images | grep 'usagov-2021')"
    fi
done

cd "${USAGOV_PROJECT_LOCATION}" || exit 1
git fetch origin prod:prod
git checkout prod

for param in "$@"; do
# stop and checkout if --dev flag is passed
    if [ "$param" = "--dev" ]; then
        echo "Parameter found: ${param}"
        echo "checking out dev branch"
        git fetch origin dev:dev
        git checkout dev
    fi
done

# check for database
if test -f "${USAGOV_PROJECT_LOCATION}/usagov.sql"
then
    # set up usagov project
    bin/init

    # include benefit finder data
    mkdir -p ./s3/local/cms/public/benefit-finder/api/life-event
    curl -o ./s3/local/cms/public/benefit-finder/api/life-event/death.json https://www.usa.gov/s3/files/benefit-finder/api/life-event/death.json
    curl -o ./s3/local/cms/public/benefit-finder/api/life-event/es_death.json https://www.usa.gov/s3/files/benefit-finder/api/life-event/es_death.json

    bin/db-update
    bin/drupal-update
    docker compose up -d

    # build benefit finder app
    bash "${SCRIPTS_LOCATION}/mv-benefit-finder-app.sh"

    # move benefit finder app into module and move it to usagov-2021 custom modules
    bash "${SCRIPTS_LOCATION}/mv-usagov_benefit_finder.sh"

    # post build import
    bin/drush cim --partial --source=modules/custom/usagov_benefit_finder/configuration -y
    bin/drush cr
    bin/drush state:set system.maintenance_mode 0 -y
else
    echo "ERROR: missing database"
fi

