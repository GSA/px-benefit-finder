#!/bin/sh

/var/www/vendor/bin/drush cr
/var/www/vendor/bin/drush state:set system.maintenance_mode 0 -y

/init &