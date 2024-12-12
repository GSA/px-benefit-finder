#!/bin/bash

## Make sure the last line has a new line or the pipeline script won't read it.
## It reads lines based on new lines.

echo  "Updating drupal ... "
drush state:set system.maintenance_mode 1 -y
drush cr
drush updatedb --no-cache-clear -y
drush cim --partial --source=modules/custom/usagov_benefit_finder/configuration -y
drush cr
drush user:password gene_chi "TU_PASS"
drush user:password scott_queen "TU_PASS"
drush user:password nehemia_abuga "TU_PASS"
drush user:password diego_cob "TU_PASS"
drush user:password cindy_fong "TU_PASS"
drush user:password ernie_deeb "TU_PASS"
drush state:set system.maintenance_mode 0 -y
drush user:create test_test --password="TU_PASS" || true
drush user:create xtest_test --password="TU_PASS" || true
echo "Post deploy finished!"


