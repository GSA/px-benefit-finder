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
drush upwd gene_chi TU_PASS
drush upwd scott_queen TU_PASS
drush upwd nehemia_abuga TU_PASS
drush upwd diego_cob TU_PASS
drush upwd cindy_fong TU_PASS
drush upwd ernie_deeb TU_PASS
# drush upwd test_test TU_PASS

drush state:set system.maintenance_mode 0 -y
echo "Post-deploy finished!"

