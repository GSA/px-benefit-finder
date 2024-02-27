#!/bin/bash

set -e

backup_bucket="${project}-backup-${ENVIRONMENT}"
space="${project}-${ENVIRONMENT}"

echo "Getting backup bucket credentials..."
{
  cf target -s "${space}"

  export service="${backup_bucket}"
  export service_key="${service}-pipeline-key"
  cf delete-service-key "${service}" "${service_key}" -f
  cf create-service-key "${service}" "${service_key}"
  sleep 2
  export s3_credentials=$(cf service-key "${service}" "${service_key}" | tail -n +2)

  export AWS_ACCESS_KEY_ID=$(echo "${s3_credentials}" | jq -r '.credentials.access_key_id')
  export bucket=$(echo "${s3_credentials}" | jq -r '.credentials.bucket')
  export AWS_DEFAULT_REGION=$(echo "${s3_credentials}" | jq -r '.credentials.region')
  export AWS_SECRET_ACCESS_KEY=$(echo "${s3_credentials}" | jq -r '.credentials.secret_access_key')

} >/dev/null 2>&1

echo "Downloading backup..."
{

  rm -f *.sql
  
  DATABASE_FILE="database_restore.sql.gz"

  [ -n "${S3_FILE_PATH}" ] && DATABASE_FILE="${S3_FILE_PATH}"

  aws s3 cp "s3://${bucket}/${DATABASE_FILE}" database_restore.sql.gz  --no-verify-ssl 2>/dev/null

  ## Delete database_restore.tar.gz after it's downloaded.
  ## [ -z ${S3_FILE_PATH} ] && aws s3 rm s3://${bucket}/database_restore.sql.gz --no-verify-ssl 2>/dev/null
  cf delete-service-key "${service}" "${service_key}" -f

} >/dev/null 2>&1

echo "File downloaded: ${DATABASE_FILE}"