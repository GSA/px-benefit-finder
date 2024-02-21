#!/bin/bash

## To work for rootless and root images.
echo "Installing basic dependencies..."
{
  if [ "$(whoami)" != "root" ]; then
    sudo apt-get update
    sudo apt-get install -y wget gnupg gettext jq
  else
    apt-get update
    apt-get install -y wget gnupg gettext jq
  fi
} >/dev/null 2>&1