locals {
  cloudfoundry = {
    external_applications = try(data.cloudfoundry_app.external_applications, null)
    domain_external = try(data.cloudfoundry_domain.external, null)
    domain_internal = try(data.cloudfoundry_domain.internal, null)
    # egress_app = try(data.cloudfoundry_app.egress_proxy[0], null)
    # egress_space = try(data.cloudfoundry_space.egress_proxy[0], null)
    # egress_route = try(data.cloudfoundry_route.egress_proxy[0], {})
    organization = try(data.cloudfoundry_org.this, null)
    services = try(data.cloudfoundry_service.this, null)
    space = try(data.cloudfoundry_space.this[0], null)
  }
}

data "cloudfoundry_app" "external_applications" {
  for_each = {
    for key, value in try(local.env.external_applications, {}) : key => value
    if try(value.deployed, false) && 
       try(data.cloudfoundry_space.this[0].id, null) != null
  }
  name_or_id  = format(local.env.name_pattern, each.key)
  space       = try(data.cloudfoundry_space.this[0].id, null)
} 

data "cloudfoundry_domain" "external" {
  domain      = "${split(".", local.env.external_domain)[1]}.${split(".", local.env.external_domain)[2]}"
  sub_domain  = split(".", local.env.external_domain)[0]
}

data "cloudfoundry_domain" "internal" {
  domain      = split(".", local.env.internal_domain)[1]
  sub_domain  = split(".", local.env.internal_domain)[0]
}

data "cloudfoundry_org" "this" {
  name = local.env.organization
}

data "cloudfoundry_space" "this" {
  count = terraform.workspace != local.env.bootstrap_workspace ? 1 : 0
  name  = try(local.env.space, terraform.workspace)
  org   = data.cloudfoundry_org.this.id
}


data "cloudfoundry_service" "this" {
  for_each = {
  for key, value in try(local.env.services, {}) : key => value
  if value.service_type != "user-provided" && 
     try(data.cloudfoundry_space.this[0].id, null) != null
  }
  
  name          = each.value.service_type
  space         = try(data.cloudfoundry_space.this[0].id, null)
}

# data "cloudfoundry_space" "egress_proxy" {
#   count = terraform.workspace != local.env.egress.workspace && terraform.workspace != local.env.bootstrap_workspace ? 1 : 0
#   name    = local.env.egress.space
#   org     = data.cloudfoundry_org.this.id
# }

# data "cloudfoundry_app" "egress_proxy" {
#   count = terraform.workspace != local.env.egress.workspace && terraform.workspace != local.env.bootstrap_workspace ? 1 : 0
#   name_or_id  = format(local.env.egress.name_pattern, local.env.egress.name)
#   space       = data.cloudfoundry_space.egress_proxy[0].id
# }

# data "cloudfoundry_route" "egress_proxy" {
#   count = terraform.workspace != local.env.egress.workspace && terraform.workspace != local.env.bootstrap_workspace ? 1 : 0
#   domain = data.cloudfoundry_domain.internal.id
#   hostname = data.cloudfoundry_app.egress_proxy[0].name
# }
