#!/bin/bash

APP_NAME=$1
command=$2
show_output=$3

APP_GUID=$(cf app "${APP_NAME}" --guid)
bin_path="/var/www/vendor/bin/:/home/vcap/deps/0/bin/"


### Start Remove After Testing
if [ -z "${APP_NAME}" ] || [ -z "${command}" ]; then
  echo "Command error! Valid format: ${0} <application_name> <command>"
  exit 1
fi
### End Remove After Testing

###Uncomment after testing
# [ -z "${APP_NAME}" ] || [ -z "${command}" ] && echo "Command error! Valid format: ${0} <application_name> <command>" && exit 1

ssh_config=/tmp/ssh_config
ssh_passwd="/tmp/ssh_password"

cat >${ssh_config} <<EOL
Host ssh.fr.cloud.gov
  Hostname ssh.fr.cloud.gov
  Port 2222
  User cf:${APP_GUID}/0
  StrictHostKeyChecking no
  RequestTTY force
EOL

# echo "Fetching SSH code..." ### Remove Line after testing
cf ssh-code > ${ssh_passwd}

### Start Remove After Testing
# Enhanced troubleshooting: Always show detailed output
# echo "Executing command via SSH: ${command}"
# output=$(sshpass -f "${ssh_passwd}" ssh -F "${ssh_config}" "ssh.fr.cloud.gov" "touch ~/.bashrc && source ~/.bashrc && PATH=\$PATH:${bin_path} ${command}" 2>&1)
#
# # Capture the exit code
# exit_code=$?
#
# Log output and errors
# if [ $exit_code -ne 0 ]; then
#   echo "Error encountered during SSH command execution."
#   echo "Command: ${command}"
#   echo "Output:"
#   echo "${output}"
#   echo "Exit Code: ${exit_code}"
# else
#   echo "Command executed successfully. Output:"
#   echo "${output}"
# fi
#
# exit $exit_code
### End Remove After Testing

###Uncomment after testing

if [ -z "${show_output}" ]; then
  echo "Running command: '$(echo "${command}" | cut -d' ' -f1,2)'..."
  {
    sshpass -f "${ssh_passwd}" ssh -F "${ssh_config}" "ssh.fr.cloud.gov" "touch ~/.bashrc && source ~/.bashrc && PATH=\$PATH:${bin_path} ${command}"
  } >/dev/null 2>&1
else
  sshpass -f "${ssh_passwd}" ssh -F "${ssh_config}" "ssh.fr.cloud.gov" "touch ~/.bashrc && source ~/.bashrc && PATH=\$PATH:${bin_path} ${command}"
fi
