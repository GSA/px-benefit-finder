#!/bin/bash

## Set the root directory in the pipeline
ROOT_DIR=$(git rev-parse --show-toplevel)
# log into cf (dev)
# check if benefit-finder application exist
if ! cf orgs; then
    echo "log in to cloud foundry ..."
    cf login -a api.fr.cloud.gov --sso
fi

# create aws credentials
set -o allexport
# export "$(grep -v '^#' "${ROOT_DIR}/benefit-finder/.env.local"| xargs)"
source "${ROOT_DIR}/benefit-finder/.env.local" set
set +o allexport
env | grep -i bucket

# export "$(grep -v '^#' "${ROOT_DIR}/scripts/local/cloud-gov-s3-creds.sh"| xargs)"
set -o allexport
source "${ROOT_DIR}/scripts/local/cloud-gov-s3-creds.sh"
set +o allexport
env | grep -i aws

# use s3tp to download latest_backup.gz.sql
if ! s3tp; then
    echo "install s3tp ..."
    exit 1
fi

s3tp

#  move and rename database
echo  "Move latest db to usagov-2021 ... "
gunzip -c ~/Downloads/latest.sql.gz > "${ROOT_DIR}/usagov-2021/usagov.sql"

# build app
echo  "Build and move benefit-finder app to usagov_benefit_finder module... "
bash "${ROOT_DIR}/scripts/pipeline/mv-benefit-finder-app.sh"

# move to module
echo  "Move usagov_benefit_finder module to usagov-2021 ... "
bash "${ROOT_DIR}/scripts/pipeline/mv-usagov_benefit_finder.sh"

# move to usagov-2021
echo  "Changing directories ... "
cd "${ROOT_DIR}/usagov-2021/" || exit 1

# # initialize project
# echo  "initialize project ... "
# bin/init

# # build container
# echo  "Build docker container ... "
# docker compose up -d

# # update config
# echo  "Updating drupal ... "
# bin/drush updatedb --no-cache-clear -y
# bin/drush cim --partial --source=modules/custom/usagov_benefit_finder/configuration -y
# bin/drush cr
# bin/drush state:set system.maintenance_mode 0 -y
# echo "Post deploy finished!"

# # generate uli
# bin/drush uli
# echo http://localhost


