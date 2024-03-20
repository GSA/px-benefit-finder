#!/bin/bash

set -e

backup_bucket="${project}-backup-${ENVIRONMENT}"
space="${project}-${ENVIRONMENT}"

if [ -z ${S3_FILE_PATH} ]; then
  echo "Getting backup bucket credentials..."
  {
    cf target -s "${space}"

    export service="${backup_bucket}"
    export service_key="${service}-pipeline-post-restore-${ENVIRONMENT}-key"
    cf delete-service-key "${service}" "${service_key}" -f
    cf create-service-key "${service}" "${service_key}"
    sleep 2
    export s3_credentials=$(cf service-key "${service}" "${service_key}" | tail -n +2)

    export AWS_ACCESS_KEY_ID=$(echo "${s3_credentials}" | jq -r '.credentials.access_key_id')
    export bucket=$(echo "${s3_credentials}" | jq -r '.credentials.bucket')
    export AWS_DEFAULT_REGION=$(echo "${s3_credentials}" | jq -r '.credentials.region')
    export AWS_SECRET_ACCESS_KEY=$(echo "${s3_credentials}" | jq -r '.credentials.secret_access_key')

  } >/dev/null 2>&1

  echo "Cleaning up old backup from S3..."
  {
    ## Delete database_restore.tar.gz after it's downloaded.
    aws s3 rm s3://${bucket}/database_restore.sql.gz --no-verify-ssl 2>/dev/null

    cf delete-service-key "${service}" "${service_key}" -f

  } >/dev/null 2>&1
fi

echo "Restore complete!"