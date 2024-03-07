#!/bin/sh

/var/www/vendor/bin/drush state:set system.maintenance_mode 0
/var/www/vendor/bin/drush pm:uninstall usagov_login || true
/var/www/vendor/bin/drush cr
/var/www/vendor/bin/drush cim --partial --source=modules/custom/usagov_benefit_finder/configuration -y
/var/www/vendor/bin/drush cr
/init &