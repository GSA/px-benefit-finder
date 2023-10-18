locals {

  ## Map of merged external and internal applications.
  apps_merged = merge(
    try(local.env.apps, {}),
    try(local.external_applications[terraform.workspace], {})
  )

  ## Map of application routes that will be created.
  domains = merge(
    merge(
      flatten([
        for key, value in try(local.apps_merged, {}) : {
          "${key}_internal_endpoint" = "${format(local.env.name_pattern, key)}.${local.env.internal_domain}"
        } if !try(value.public_route, false)
      ])
    ...),
    merge(
      flatten([
        for key, value in try(local.apps_merged, {}) : {
          "${key}_external_endpoint" = "${format(local.env.name_pattern, key)}.${local.env.external_domain}"
        } if try(value.public_route, false)
      ])
    ...)
  )

  ## Additional environment variables that applications might need.
  extra_variables = {
    all = merge(
      {
        # ca_certificate = module.certificates.certificate.base64
        # ca_key         = module.certificates.key.base64
        cf_space       = local.env.space
        cms_uri = terraform.workspace == "prod" ? "https://cms.vote.gov" : format(
          "https://cms-%s.vote.gov",
          terraform.workspace
        )
        drupal_instances = try(
          local.external_applications[terraform.workspace].drupal.instances,
          local.env.defaults.instances
        )
        drupal_memory = try(
          local.external_applications[terraform.workspace].drupal.memory,
          local.env.defaults.memory
        )
        drupal_port = try(
          local.external_applications[terraform.workspace].drupal.port,
          local.env.defaults.port
        )
        newrelic_key = var.newrelic_key
        # proxy_uri = format(
        #   "https://%s:%s@%s.%s:%s",
        #   var.proxy_username,
        #   var.proxy_password,
        #   format(local.egress.name_pattern, local.egress.name),
        #   local.env.internal_domain,
        #   var.mtls_port
        # )
        # ssg_uri = terraform.workspace == "prod" ? "https://ssg.vote.gov" : format(
        #   "https://ssg-%s.vote.gov",
        #   terraform.workspace
        # )
        # sso_x509_cert = var.sso_x509_cert
        waf_name      = format(local.env.name_pattern, "waf")
      },
      merge(
        flatten([
          for key, value in module.random.results : {
            "${key}" = value.result
          }
        ])
      ...)
    )
    bootstrap = {
      # may be needed for bootstrap but variables have been removed
      #backend_aws_bucket_name   = var.backend_aws_bucket_name
      #backend_aws_bucket_region = var.backend_aws_bucket_region
      #backup_aws_bucket_name    = var.backup_aws_bucket_name
      #backup_aws_bucket_region  = var.backup_aws_bucket_region
      circleci_token    = var.circleci_token
      cloudgov_password = var.cloudgov_password
      cloudgov_username = var.cloudgov_username
      cf_org            = local.env.organization
      drupal_port       = var.mtls_port
      # no_proxy          = ".${local.env.internal_domain}"
      project           = local.project
      # dmz_space         = local.env.egress.space
      proxy_credentials = jsonencode(
        merge(
          flatten([
            for key, value in module.random.results : {
              "${key}" = value.result
            } if try(regex("^(?:\\w+_)(proxy_password|proxy_username)$", key), null) != null
          ])
        ...)
      )
    },
    dev = {
      drupal_internal_endpoint = "benefit-finder-cms-dev.apps.internal"
    },
    main = {
      drupal_internal_endpoint = "benefit-finder-cms-main.apps.internal"
    }
    # dmz = {
    #   proxy_password = var.proxy_password,
    #   proxy_port     = local.env.egress.port
    #   proxy_username = var.proxy_username
    #   proxy_name = format(
    #     local.env.egress.name_pattern,
    #     local.env.egress.name
    #   )
    #   proxy_space = local.env.space
    # }
  }

  ## Map of service instances and secrets merged together.
  services = {
    instance = merge(
      module.services.results.instance,
      module.secrets.results.instance
    )
    user_provided = merge(
      module.services.results.user_provided,
      module.secrets.results.user_provided
    )
    service_key = merge(
      module.services.results.service_key,
      module.secrets.results.service_key
    )
  }

  ## Map of service credentials (i.e. S3 bucket credentials).
  service_keys = merge(
    flatten([
      for key, value in try(local.env.services, {}) : [
        for k, v in try(module.services.results.service_key[key].credentials, {}) : {
          "${key}_${k}" = v
        }
      ] if try(module.services.results.service_key[key].credentials, null) != null
    ])
  ...)

  ## Merging of the various credentials and environmental variables.
  secrets = merge(
    try(local.extra_variables[terraform.workspace], {}),
    try(local.extra_variables.all, {}),
    try(local.service_keys, {}),
    local.domains
  )

  ## List of the workspaces defined in the configuration above.
  workspaces = flatten([
    for key, value in local.envs : [
      key
    ] if key != "all" || key != local.bootstrap_workspace
  ])
}
