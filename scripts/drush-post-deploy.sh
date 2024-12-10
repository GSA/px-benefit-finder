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
drush user:create test_test --password="TU_PASS"
drush upwd --password="TU_PASS" gene_chi
drush upwd --password="TU_PASS" scott_queen
drush upwd --password="TU_PASS" nehemia_abuga
drush upwd --password="TU_PASS" diego_cob
drush upwd --password="TU_PASS" cindy_fong
drush upwd --password="TU_PASS" ernie_deeb

drush state:set system.maintenance_mode 0 -y
echo "Post-deploy finished!"

