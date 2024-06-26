#!/bin/bash

# home="/home/vcap"
# app_path="${home}/app"
app_path="/var/www"
html_path="${app_path}/html"
environment="benefit-finder-dev"

# source ${home}/.bashrc

mkdir -p "${html_path}"

export PYTHONWARNINGS="ignore:Unverified HTTPS request"

application_uri=$(echo "${VCAP_APPLICATION}" | jq -r '.application_uris[]')
export application_uri

AWS_ACCESS_KEY_ID=$(echo "${VCAP_SERVICES}" | jq -r '.s3[] | select(.name | strings | test("static")).credentials.access_key_id')
export AWS_ACCESS_KEY_ID

AWS_SECRET_ACCESS_KEY=$(echo "${VCAP_SERVICES}" | jq -r '.s3[] | select(.name | strings | test("static")).credentials.secret_access_key')
export AWS_SECRET_ACCESS_KEY

AWS_DEFAULT_REGION=$(echo "${VCAP_SERVICES}" | jq -r '.s3[] | select(.name | strings | test("static")).credentials.region')
export AWS_DEFAULT_REGION

bucket_name=$(echo "${VCAP_SERVICES}" | jq -r '.s3[] | select(.name | strings | test("static")).name')
export bucket_name

bucket=$(echo "${VCAP_SERVICES}" | jq -r '.s3[] | select(.name | strings | test("static")).credentials.bucket')
export bucket

bucket_endpoint=$(echo "${VCAP_SERVICES}" | jq -r '.s3[] | select(.name | strings | test("static")).credentials.endpoint')
export bucket_endpoint

# export ssg_endpoint="http://benefit-finder-cms-dev.app.cloud.gov"
# [ "${environment}" = "prod" ] && export ssg_endpoint="https://ssg.vote.gov"

cd "${app_path}" || exit 1
echo "Running 'drush cron' in '${environment}'..."
# /var/www/vendor/bin/drush --uri=${ssg_endpoint} cron
/var/www/vendor/bin/drush cron
echo "'drush cron' task completed!"

echo "Running 'drush tome:static' in '${environment}'..."
# /var/www/vendor/bin/drush tome:static --uri=${ssg_endpoint} --process-count=2 --retry-count=0 -y
# /var/www/vendor/bin/drush tome:static --path-pattern="/benefit-finder\/life-event\//" --process-count=2 --retry-count=0 -y
/var/www/vendor/bin/drush tome:static --process-count=1 --retry-count=0 -y
# /var/www/vendor/bin/drush tome:static-export-path '/sitemap.xml,/sitemap_generator/default/sitemap.xsl' --uri=${ssg_endpoint} --process-count=2 --retry-count=0 -y
echo "'drush tome:static' task completed!"

# echo "Adding missing Core assets vendor directory"
# mkdir -p ${html_path}/core/assets
# cp -rfp ${app_path}/web/core/assets/vendor ${html_path}/core/assets/
# echo "Missing Core assets files completed!"

# echo "Adding missing module files for Sitemap"
# mkdir -p ${html_path}/modules/contrib/simple_sitemap/xsl
# cp -rfp ${app_path}/web/modules/contrib/simple_sitemap/xsl/* ${html_path}/modules/contrib/simple_sitemap/xsl/
# echo "Missing module files for Sitemap completed!"

# echo "Adding Vote.gov custom theme assets"
# mkdir -p ${html_path}/themes/custom/votegov
# cp -rfp ${app_path}/web/themes/custom/votegov/dist ${html_path}/themes/custom/votegov/
# cp -rfp ${app_path}/web/themes/custom/votegov/fonts ${html_path}/themes/custom/votegov/
# cp -rfp ${app_path}/web/themes/custom/votegov/img ${html_path}/themes/custom/votegov/
# cp -rfp ${app_path}/web/themes/custom/votegov/json ${html_path}/themes/custom/votegov/
# echo "Adding Vote.gov custom theme assets - completed!"

cd "${html_path}" || exit 1
echo "Copying static files to '${bucket_name}'..."
cp -r /var/www/web/themes/custom/usagov/fonts  ${html_path}/themes/custom/usagov 
cp -r /var/www/web/themes/custom/usagov/images ${html_path}/themes/custom/usagov 
cp -r /var/www/web/themes/custom/usagov/assets ${html_path}/themes/custom/usagov 
aws s3 sync . "s3://${bucket}" --delete --no-verify-ssl # 2>/dev/null
aws s3 website "s3://${bucket}" --index-document index.html --error-document /404/index.html  --no-verify-ssl # 2>/dev/null
echo "Copy to '${bucket_name}' completed!"

# export objects=($(aws s3 ls s3://${bucket} --recursive --no-verify-ssl 2>/dev/null | awk '{print $(NF)}' | sed -z -e 's/\n/ /g'))

# for object in "${objects[@]}"; do
#   echo $object
#   aws s3api put-object-acl --bucket s3://${bucket} --key $object --grant-full-control id=c0eaf99010b9e4b073052b3a9b242980a2badf4e1db4044f53f49950609bf6cf --grant-read uri=http://acs.amazonaws.com/groups/global/AllUsers --no-verify-ssl # 2>/dev/null
# done