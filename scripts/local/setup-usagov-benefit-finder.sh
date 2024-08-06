#!/bin/bash

# Set the root directory
ROOT_DIR=$(git rev-parse --show-toplevel)

# usagov-2021 project
USAGOV_PROJECT_LOCATION="${ROOT_DIR}/usagov-2021"
SCRIPTS_LOCATION="${ROOT_DIR}/scripts/pipeline"
BRANCH=""


# make specific to usagov
for param in "$@"; do
  # stop and remove any old docker stuff if --rebuild flag is passed
    if [ "$param" = "--rebuild" ]; then
        echo "Parameter found: ${param}"
        echo "destroying all usagov-2021 containers"
        docker stop "$(docker ps -aq)"
        docker system prune --all
        docker rm -f "$(docker ps -aq)"
        docker volume rm -f "$(docker volume ls | grep 'usagov')"
        docker rmi -f "gsatts/usagov-2021:cms-latest"
        docker rmi -f "$(docker images | grep 'usagov-2021')"
    fi
done

# check for database
if test -f "${USAGOV_PROJECT_LOCATION}/usagov.sql"
then
    cd "${USAGOV_PROJECT_LOCATION}" || exit 1

    git fetch origin prod:prod
    git checkout prod

    for param in "$@"; do
    PARAM=$(echo "$param" | cut -d= -f1)
    BRANCH=$(echo "$param" | cut -d= -f2)

    # stop and checkout custom branch request
        if [ "$PARAM" = "--branch" ]; then
            echo "Parameter found: ${PARAM}"
            echo "checking out ${BRANCH}"
            git fetch origin "${BRANCH}:${BRANCH}"
            git checkout "${BRANCH}"
        fi
    done
    # set up usagov project
    bin/init

    # include benefit finder data
    mkdir -p ./s3/local/cms/public/benefit-finder/api/life-event
    curl -o ./s3/local/cms/public/benefit-finder/api/life-event/death.json https://www.usa.gov/s3/files/benefit-finder/api/life-event/death.json
    curl -o ./s3/local/cms/public/benefit-finder/api/life-event/es_death.json https://www.usa.gov/s3/files/benefit-finder/api/life-event/es_death.json
    cd "${ROOT_DIR}" || exit 1
    # build benefit finder app
    bash "${SCRIPTS_LOCATION}/mv-benefit-finder-app.sh"

    # move benefit finder app into module and move it to usagov-2021 custom modules
    bash "${SCRIPTS_LOCATION}/mv-usagov_benefit_finder.sh"

    cd "${USAGOV_PROJECT_LOCATION}" || exit 1
    git checkout "${BRANCH}"

    docker-compose up -d
    bin/db-update
    bin/drupal-update

    # post build import
    bin/drush cim --partial --source=modules/custom/usagov_benefit_finder/configuration -y
    bin/drush cr
    bin/drush state:set system.maintenance_mode 0 -y

    bin/drush uli
else
    echo "ERROR: missing database"
fi

