#!/bin/bash

echo "Installing CloudFoundry repository..."
{
  if [ "$(whoami)" != "root" ]; then
    wget -U "" -q -O - https://packages.cloudfoundry.org/debian/cli.cloudfoundry.org.key | sudo apt-key add -
    echo "deb https://packages.cloudfoundry.org/debian stable main" | sudo tee /etc/apt/sources.list.d/cloudfoundry-cli.list
    sudo apt-get update
    sudo apt-get install -y cf8-cli
  else
    wget -U "" -q -O - https://packages.cloudfoundry.org/debian/cli.cloudfoundry.org.key | apt-key add -
    echo "deb https://packages.cloudfoundry.org/debian stable main" | tee /etc/apt/sources.list.d/cloudfoundry-cli.list
    apt-get update
    apt-get install -y cf8-cli
  fi
  cf install-plugin -f https://github.com/cloud-gov/cf-service-connect/releases/download/v1.1.3/cf-service-connect_linux_amd64
} &> /dev/null
