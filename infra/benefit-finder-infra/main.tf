# module "certificates" {
#   source       = "./modules/certificate"
#   project_name = local.env.project
#   workspace    = local.env.bootstrap_workspace
#   env          = local.env
# }

module "random" {
  source    = "./modules/random"
  names     = local.workspaces
  passwords = local.env.passwords
}

## The instanced services (i.e. RDS, S3, etc.) get created first.
## This allows their credentials to be injected into "user-provided" services (JSON blobs), if needed.
module "services" {
  source = "./modules/service"

  cloudfoundry                = local.cloudfoundry
  env                         = local.env
  skip_user_provided_services = true

  depends_on = [
    module.random
  ]
}

module "secrets" {
  source = "./modules/service"

  cloudfoundry           = local.cloudfoundry
  env                    = local.env
  skip_service_instances = true
  secrets                = local.secrets

  depends_on = [
    module.random
  ]
}

module "applications" {
  source = "./modules/application"

  cloudfoundry = local.cloudfoundry
  env          = local.env
  secrets      = local.secrets
  services     = local.services
}

# module "circleci" {
#   source = "./modules/circleci"

#   env       = local.env
#   secrets   = local.secrets
#   schedules = local.env.circleci.schedules
# }
