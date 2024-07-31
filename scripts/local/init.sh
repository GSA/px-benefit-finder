#!/bin/bash

## Set the root directory in the pipeline
ROOT_DIR=$(git rev-parse --show-toplevel)

# set up githooks
echo("Set githook config to point at custom hooks")
git config --local core.hooksPath .githooks/

echo("Install usagov-2021 submodule")
# set up gitsubmodule
git submodule init
git submodule update

echo("setup our benefit finder dependencies and containers")
bash `${ROOT_DIR}/scripts/local/setup-usagov-benefit-finder.sh`
