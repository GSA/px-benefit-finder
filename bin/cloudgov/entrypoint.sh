#!/bin/sh

/var/www/vendor/bin/drush state:set system.maintenance_mode 0
/var/www/vendor/bin/drush pm:uninstall usagov_login || true
/var/www/vendor/bin/drush cr
/var/www/vendor/bin/drush sdel usagov.tome_run_disabled
/init &