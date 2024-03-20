#!/bin/bash

current_path=$(pwd)

## Get current username with no special characters.
user=$(whoami | tr -dc '[:alnum:]\n\r' | tr '[:upper:]' '[:lower:]')

[ -z "${bucket_name}" ] && echo "No bucket name!" && exit 1

echo "Getting bucket credentials..."
{
  current_space=$(cf target | grep space | awk '{print $2}')

  cf target -s "${deploy_space}"
  
  service_key="${bucket_name}-${user}-key"
  
  ## Delete any old keys.
  cf delete-service-key "${bucket_name}" "${service_key}" -f

  s3_credentials=$(cf service-key "${bucket_name}" "${service_key}" | tail -n +2)
} >/dev/null 2>&1

echo "Creating key..."
{
  cf create-service-key "${bucket_name}" "${service_key}"
  s3_credentials=$(cf service-key "${bucket_name}" "${service_key}" | tail -n +2)
  aws_access_key=$(echo "${s3_credentials}" | jq -r '.credentials.access_key_id')
  aws_bucket_name=$(echo "${s3_credentials}" | jq -r '.credentials.bucket')
  aws_bucket_region=$(echo "${s3_credentials}" | jq -r '.credentials.region')
  aws_secret_key=$(echo "${s3_credentials}" | jq -r '.credentials.secret_access_key')
  export AWS_ACCESS_KEY_ID=${aws_access_key}
  export AWS_BUCKET=${aws_bucket_name}
  export AWS_DEFAULT_REGION=${aws_bucket_region}
  export AWS_SECRET_ACCESS_KEY=${aws_secret_key}
  cf target -s "${current_space}"
} >/dev/null 2>&1