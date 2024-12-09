#!/bin/bash

## Make sure the last line has a new line or the pipeline script won't read it.
## It reads lines based on new lines.

echo "Updating Drupal..."
drush cr
drush state:set system.maintenance_mode 1 -y
drush cr
drush updatedb --no-cache-clear -y
drush cim --partial --source=modules/custom/usagov_benefit_finder/configuration -y
drush cr

# Update passwords for existing users
echo "Updating passwords for test users..."
drush upwd scott_queen --password="TU_PASS"
drush upwd nehemia_abuga --password="TU_PASS"
drush upwd diego_cob --password="TU_PASS"
drush upwd cindy_fong --password="TU_PASS"
drush upwd ernie_deeb --password="TU_PASS"
drush upwd test_test --password="TU_PASS"

drush state:set system.maintenance_mode 0 -y
echo "Post-deploy finished!"

