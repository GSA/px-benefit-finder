#!/bin/bash

apps="ca-certificates coreutils curl gnupg gettext jq sshpass wget"

## To work for rootless and root images.
echo "Installing basic dependencies..."
#{
  if [ "$(whoami)" != "root" ]; then
    sudo apt-get update
    sudo apt-get install -y $apps
  else
    apt-get update
    apt-get install -y $apps
  fi
#} >/dev/null 2>&1