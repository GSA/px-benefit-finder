#!/bin/bash

application=$1
command=$2

drush_path=/var/www/vendor/bin/

[ -z "${application}" ] || [ -z "${command}" ] && echo "Command error! Valid format: ${0} <application_name> <command>" && exit 1

echo "Running command: '$(echo ${command} | cut -d' ' -f1,2)'..."
{
  cf ssh ${application} -c "PATH=\$PATH:${drush_path} ${command}"
} >/dev/null 2>&1