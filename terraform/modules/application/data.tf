locals {

    ## Create a single list of external service names. Multiple applications
    ## could reference the same service, but the GUID only needs to be looked up once.
    services_external = distinct(
      flatten(
        [
          for key, value in try(var.env.apps, {}) : [
            try(var.env.apps[key].services_external, [])
          ]
        ]
      )
    )
}

output "name" {
  value = data.cloudfoundry_service_instance.this
}

## Lookup up service instance GUID's for existing services.
## These can be externally deployed services or services deployed from different code sources.
## The GUID can then be refrenced by data.cloudfoundry_service_instance.this["service-name"].id
data "cloudfoundry_service_instance" "this" {
  for_each = {
    for key, value in local.services_external : value => value
  }
  name_or_id          = each.value
  space         = try(var.cloudfoundry.space.id, null)
}