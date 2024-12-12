#!/bin/bash
set -x


## Set the root directory in the pipeline
ROOT_DIR=$(git rev-parse --show-toplevel)

while read -r command; do 
  ## Don't send comments, empty lines, or echos.
  if [[ "${command}" != "#"* ]] && [[ -n "${command}" ]] && [[ "${command}" != "echo "*  ]]; then
    bash ./scripts/pipeline/cloud-gov-remote-command.sh "${PROJECT}-cms-${BRANCH}" "${command}" #< /dev/null
  fi
done < "${ROOT_DIR}/scripts/drush-post-deploy.sh"
