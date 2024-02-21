#!/bin/bash

# CF_USER=$1
# CF_PASSWORD=$2
# CF_ORG=$3
# BACKUP_ENV=$4

echo "Logging into Cloud.gov..."
{
  cf login \
    -a https://api.fr.cloud.gov \
    -u ${CF_USER} \
    -p ${CF_PASSWORD} \
    -o ${CF_ORG} \
    -s benefit-finder-${BACKUP_ENV} > login.log || login_error=1
} >/dev/null 2>&1

[ -n "${login_error}" ] && echo "Error logging into Cloud.gov!" && exit 1

echo "Login successful!"