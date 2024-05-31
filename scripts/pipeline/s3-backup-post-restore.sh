#!/bin/bash

set -e

backup_bucket="${PROJECT}-backup-${BRANCH}"
space="${PROJECT}-${BRANCH}"

if [ -z "${S3_FILE_PATH}" ]; then
  echo "Getting backup bucket credentials..."
  {
    cf target -s "${space}"

    service="${backup_bucket}"
    service_key="${service}-pipeline-post-restore-${BRANCH}-key"
    cf delete-service-key "${service}" "${service_key}" -f
    cf create-service-key "${service}" "${service_key}"
    sleep 2
    s3_credentials=$(cf service-key "${service}" "${service_key}" | tail -n +2)

    AWS_ACCESS_KEY_ID=$(echo "${s3_credentials}" | jq -r '.credentials.access_key_id')
    export AWS_ACCESS_KEY_ID
    
    bucket=$(echo "${s3_credentials}" | jq -r '.credentials.bucket')
    export bucket
  
    AWS_BUCKET="${bucket}"
    export AWS_BUCKET
    
    AWS_DEFAULT_REGION=$(echo "${s3_credentials}" | jq -r '.credentials.region')
    export AWS_DEFAULT_REGION
  
    AWS_SECRET_ACCESS_KEY=$(echo "${s3_credentials}" | jq -r '.credentials.secret_access_key')
    export AWS_SECRET_ACCESS_KEY
  
  } >/dev/null 2>&1



  echo "Cleaning up old backup from S3..."
{
  ## Delete database_restore.tar.gz after it's downloaded.
  if aws s3 rm "s3://${bucket}/database_restore.sql.gz" --no-verify-ssl; then
    echo "File deleted successfully."
  else
    echo "File not found or could not be deleted. Continuing script execution."
  fi

  cf delete-service-key "${service}" "${service_key}" -f
} 
fi

echo "Restore complete!"
