#!/bin/bash

set -e

backup_bucket="${PROJECT}-backup-${BRANCH}"
space="${PROJECT}-${BRANCH}"

echo "Getting backup bucket credentials..."
# {
  cf target -s "${space}"

  service="${backup_bucket}"
  service_key="${service}-pipeline-upload-${BRANCH}-key"
  cf delete-service-key "${service}" "${service_key}" -f
  cf create-service-key "${service}" "${service_key}"
  sleep 20
  s3_credentials=$(cf service-key "${service}" "${service_key}" | tail -n +2)

  AWS_ACCESS_KEY_ID=$(echo "${s3_credentials}" | jq -r '.credentials.access_key_id')
  echo "AWS_ACCESS_KEY_ID IS: ${AWS_ACCESS_KEY_ID}"
  export AWS_ACCESS_KEY_ID
  
  bucket=$(echo "${s3_credentials}" | jq -r '.credentials.bucket')
  export bucket

  AWS_BUCKET="${bucket}"
  export AWS_BUCKET
  
  AWS_DEFAULT_REGION=$(echo "${s3_credentials}" | jq -r '.credentials.region')
  export AWS_DEFAULT_REGION

  AWS_SECRET_ACCESS_KEY=$(echo "${s3_credentials}" | jq -r '.credentials.secret_access_key')
  export AWS_SECRET_ACCESS_KEY

# } &> /dev/null

echo "Uploading backup..."
# {

  aws s3 cp "${TIMESTAMP}.sql.gz" "s3://${bucket}/$(date +%Y)/$(date +%m)/$(date +%d)/" --no-verify-ssl # 2>/dev/null
  aws s3 cp "${TIMESTAMP}.sql.gz" "s3://${bucket}/latest.sql.gz" --no-verify-ssl # 2>/dev/null
  cf delete-service-key "${service}" "${service_key}" -f

# } &> /dev/null

echo "File uploaded: $(date +%Y)/$(date +%m)/$(date +%d)/${TIMESTAMP}.sql.gz"
