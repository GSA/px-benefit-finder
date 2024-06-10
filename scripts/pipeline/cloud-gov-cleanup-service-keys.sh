#!/bin/bash

set -e

service="${PROJECT}-backup-${BRANCH}"

raw_keys=$(cf service-keys "${service}" | sed 1,3d | awk '{print $1}')
service_keys=("${raw_keys}")

echo "Cleaning up service keys..."
{
  for key in "${service_keys[@]}"; do
    echo "Deleting service key '${key}'..."
    cf delete-service-key "${service}" "${key}" -f #>/dev/null 2>&1
  done
} #>/dev/null 2>&1
