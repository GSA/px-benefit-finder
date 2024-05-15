#!/bin/bash

## Get current username with no special characters.
user=$(whoami | tr -dc '[:alnum:]\n\r' | tr '[:upper:]' '[:lower:]')

if [ -z "${bucket_name}" ]; then
  echo -e "Error: No bucket name is set!\n"
  echo -e "Export the bucket name, found with 'cf services | grep s3', then run the script again."
  echo -e "This is the name of the bucket in cloud.gov, not the AWS bucket name.\n"
  echo -e "Example usage:\n\texport bucket_name=project-bucket-name-environment\n\t$0\n"
  return
fi

echo "Getting bucket credentials..."
{
  service_key="${bucket_name}-${user}-key"

  ## Delete any old keys.
  cf delete-service-key "${bucket_name}" "${service_key}" -f
} >/dev/null 2>&1

[ "${1}" = "-d" ] && echo "AWS bucket key deleted." && return

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
} >/dev/null 2>&1