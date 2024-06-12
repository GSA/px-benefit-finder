#!/bin/bash

TF_PATH="terraform/infra"

cd "./${TF_PATH}" || exit 1

## Update terraform.tfvars with pipeline user/password.
envsubst < terraform.tfvars.tmpl > terraform.tfvars

cd "${CWD}" || exit 1

## SCP the file to the bastion.
./scripts/pipeline/cloud-gov-scp-file.sh "${TF_BASTION}" "./${TF_PATH}/terraform.tfvars" "px-benefit-finder/${TF_PATH}"