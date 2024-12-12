#!/bin/bash

## Make sure the last line has a new line or the pipeline script won't read it.
## It reads lines based on new lines.

echo  "Updating drupal ... "
drush state:set system.maintenance_mode 1 -y
drush cr
drush updatedb --no-cache-clear -y
drush cim --partial --source=modules/custom/usagov_benefit_finder/configuration -y
drush cr
### USER_PASSWORD_RESET_PLACEHOLDER ###
drush state:set system.maintenance_mode 0 -y
drush user:create test_test --password="TU_PASS"
echo "Post deploy finished!"


