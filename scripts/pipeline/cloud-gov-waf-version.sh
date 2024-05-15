#!/bin/bash

function version {
  echo "$@" | awk -F. '{ printf("%d%03d%03d%03d\n", $1,$2,$3,$4); }';
}

if [ "$(whoami)" != "root" ] ; then
  sudo wget -q --show-progress https://github.com/ericchiang/pup/releases/download/v0.4.0/pup_v0.4.0_linux_amd64.zip
  sudo unzip pup_v0.4.0_linux_amd64.zip -d /usr/local/bin
else
  wget -q --show-progress https://github.com/ericchiang/pup/releases/download/v0.4.0/pup_v0.4.0_linux_amd64.zip
  unzip pup_v0.4.0_linux_amd64.zip -d /usr/local/bin
fi

declare CLOUDGOV_WF_VERSION
CLOUDGOV_WF_VERSION=$(cf app "${PROJECT}-waf-${BRANCH}" | grep nginx_buildpack | xargs | awk '{print $2}')

declare CLOUDGOV_BP_VERSION
CLOUDGOV_BP_VERSION=$(cf buildpacks | grep nginx | grep cflinuxfs4 | awk '{print $NF}' | grep -Eo '[0-9]\.[0-9]?(.[0-9]+)')

bp_version=$(version "${CLOUDGOV_BP_VERSION}")
waf_version=$(version "${CLOUDGOV_WF_VERSION}")

if [ "${bp_version}" -ne "${waf_version}" ]; then
  echo "New version of buildpack found!"
  declare current_nginx_version
  current_nginx_version=$(curl -s "https://github.com/cloudfoundry/nginx-buildpack/releases/tag/v${CLOUDGOV_WF_VERSION}" | pup 'table json{}' | jq -r '.[].children[].children[] | select(.children[].text == "nginx") | select(.children[].text == "cflinuxfs4") | .children[].text' | tr '\n' ' ' | sed -E 's/cflinuxfs4 /cflinuxfs4\n/g' | sort -r | head -n 1 | awk '{print $2}')

  declare nginx_version
  nginx_version=$(curl -s "https://github.com/cloudfoundry/nginx-buildpack/releases/tag/v${CLOUDGOV_BP_VERSION}" | pup 'table json{}' | jq -r '.[].children[].children[] | select(.children[].text == "nginx") | select(.children[].text == "cflinuxfs4") | .children[].text' | tr '\n' ' ' | sed -E 's/cflinuxfs4 /cflinuxfs4\n/g' | sort -r | head -n 1 | awk '{print $2}')

  echo "nginx_version=${nginx_version}" >> "${GITHUB_OUTPUT}"
  echo "current_nginx_version=${current_nginx_version}" >> "${GITHUB_OUTPUT}"
  echo "cloudgov_wf_version=${CLOUDGOV_WF_VERSION}" >> "${GITHUB_OUTPUT}"
  echo "cloudgov_bp_version=${CLOUDGOV_BP_VERSION}" >> "${GITHUB_OUTPUT}"
  echo "update=true" >> "${GITHUB_OUTPUT}"
else
  echo "Running latest version of the buildpack!"
fi