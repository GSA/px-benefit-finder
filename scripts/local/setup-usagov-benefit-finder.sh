#!/bin/bash

# Set the root directory
readonly ROOT_DIR=$(git rev-parse --show-toplevel)

# usagov-2021 project
readonly USAGOV_PROJECT_LOCATION="${ROOT_DIR}/usagov-2021"
readonly SCRIPTS_LOCATION="${ROOT_DIR}/scripts/pipeline"


# make specific to usagov
for param in "$@"; do
  # stop and remove any old docker stuff if --rebuild flag is passed
    if [ "$param" = "--rebuild" ]; then
        echo "Parameter found: ${param}"
        echo "destroying all containers"
        docker stop $(docker ps -aq)
        docker rm $(docker ps -aq)
        docker network prune -f
        docker rmi -f $(docker images --filter dangling=true -qa)
        docker volume rm $(docker volume ls --filter dangling=true -q)
        docker rmi -f $(docker images -qa)
        sudo service mysql restart
    fi
done


# build benefit finder app
bash "${SCRIPTS_LOCATION}/mv-benefit-finder-app.sh"

# move benefit finder app into module and move it to usagov-2021 custom modules
bash "${SCRIPTS_LOCATION}/mv-usagov_benefit_finder.sh"

cd "${USAGOV_PROJECT_LOCATION}"
git fetch origin prod:prod
git checkout prod
echo git branch

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
    bin/drush cim --partial --source=modules/custom/usagov_benefit_finder/configuration -y
    bin/drush cr
    bin/drush state:set system.maintenance_mode 0 -y
    docker compose up
else
    echo "ERROR: missing database"
fi

