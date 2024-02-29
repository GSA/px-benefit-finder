#!/bin/bash

echo  "Updating drupal ... "
drush state:set system.maintenance_mode 1 -y
drush cr
drush updatedb --no-cache-clear -y
drush cim --partial --source=modules/custom/usagov_benefit_finder/configuration -y
drush cr
drush state:set system.maintenance_mode 0 -y
echo "Post deploy finished!"
