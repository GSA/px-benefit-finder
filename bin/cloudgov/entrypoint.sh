#!/bin/sh

/var/www/vendor/bin/drush state:set system.maintenance_mode 0
/var/www/vendor/bin/drush pm:enable usagov_benefit_finder_content
/var/www/vendor/bin/drush pm:enable usagov_benefit_finder_api
/var/www/vendor/bin/drush pm:enable usagov_benefit_finder
/var/www/vendor/bin/drush pm:enable usagov_benefit_finder_page
/var/www/vendor/bin/drush cr
cd /var/www/web/
mkdir -p content/sync
chown -R nginx:nginx content
/var/www/vendor/bin/drush cr
/init