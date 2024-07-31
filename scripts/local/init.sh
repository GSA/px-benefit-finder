#!/bin/bash

## Set the root directory in the pipeline
ROOT_DIR=$(git rev-parse --show-toplevel)

# set up githooks
echo "Set githook config to point at custom hooks"
git config --local core.hooksPath .githooks/

echo "Install usagov-2021 git submodule"
# set up gitsubmodule
git submodule init
git submodule update

# init usagov-2021
echo "init usagov-2021"
cd "${ROOT_DIR}/usagov-2021"
bin/init

# install node dependencies
echo "install benefit-finder node dependencies"
cd "${ROOT_DIR}/benefit-finder"
npm install
touch .env.local
echo "export VITE_PROXY_URL=\"https://bf-cms-dev.bxdev.net\"" >> .env.local


