#!/bin/bash

# Set the root directory in the pipeline
ROOT_DIR=$(git rev-parse --show-toplevel)

# Read the drush-post-deploy.sh file line by line
while IFS= read -r command || [[ -n "$command" ]]; do
  # Debugging: Print the current command being processed
  # echo "Processing command: ${command}"

  # Skip comments, empty lines, or echo commands
  if [[ "${command}" != "#"* ]] && [[ -n "${command}" ]] && [[ "${command}" != "echo "* ]]; then
    # echo "Running command: ${command}"
    
    # Call the cloud-gov-remote-command script with the project and branch
    bash ./scripts/pipeline/cloud-gov-remote-command.sh "${PROJECT}-cms-${BRANCH}" "${command}" < /dev/null >/dev/null 2>&1

    # Check for errors and exit if a command fails
    if [[ $? -ne 0 ]]; then
      echo "Error: Command '${command}' failed!" >&2
      exit 1
    fi
  fi
done < <(cat "${ROOT_DIR}/scripts/drush-post-deploy.sh")

# Indicate script completion
# echo "All commands processed successfully!"
exit 0

#Casey's Original Script
##!/bin/bash



## Set the root directory in the pipeline
#ROOT_DIR=$(git rev-parse --show-toplevel)

#while read -r command; do 
  ## Don't send comments, empty lines, or echos.
##  if [[ "${command}" != "#"* ]] && [[ -n "${command}" ]] && [[ "${command}" != "echo "*  ]]; then
##    bash ./scripts/pipeline/cloud-gov-remote-command.sh "${PROJECT}-cms-${BRANCH}" "${command}" #< /dev/null
##  fi
## done < "${ROOT_DIR}/scripts/drush-post-deploy.sh"
