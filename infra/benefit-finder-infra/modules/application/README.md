<!-- BEGIN_TF_DOCS -->
# CloudFoundry Application Module

## Requirements

| Name | Version |
|------|---------|
| <a name="requirement_archive"></a> [archive](#requirement\_archive) | 2.4.0 |
| <a name="requirement_cloudfoundry"></a> [cloudfoundry](#requirement\_cloudfoundry) | 0.51.2 |
| <a name="requirement_local"></a> [local](#requirement\_local) | 2.4.0 |

## Providers

| Name | Version |
|------|---------|
| <a name="provider_archive"></a> [archive](#provider\_archive) | 2.4.0 |
| <a name="provider_cloudfoundry"></a> [cloudfoundry](#provider\_cloudfoundry) | 0.51.2 |
| <a name="provider_local"></a> [local](#provider\_local) | 2.4.0 |

## Modules

No modules.

## Resources

| Name | Type |
|------|------|
| [cloudfoundry_app.this](https://registry.terraform.io/providers/cloudfoundry-community/cloudfoundry/0.51.2/docs/resources/app) | resource |
| [cloudfoundry_network_policy.egress_proxy](https://registry.terraform.io/providers/cloudfoundry-community/cloudfoundry/0.51.2/docs/resources/network_policy) | resource |
| [cloudfoundry_network_policy.ingress_proxy](https://registry.terraform.io/providers/cloudfoundry-community/cloudfoundry/0.51.2/docs/resources/network_policy) | resource |
| [cloudfoundry_route.external](https://registry.terraform.io/providers/cloudfoundry-community/cloudfoundry/0.51.2/docs/resources/route) | resource |
| [cloudfoundry_route.internal](https://registry.terraform.io/providers/cloudfoundry-community/cloudfoundry/0.51.2/docs/resources/route) | resource |
| [local_sensitive_file.this](https://registry.terraform.io/providers/hashicorp/local/2.4.0/docs/resources/sensitive_file) | resource |
| [archive_file.this](https://registry.terraform.io/providers/hashicorp/archive/2.4.0/docs/data-sources/file) | data source |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_cloudfoundry"></a> [cloudfoundry](#input\_cloudfoundry) | The settings object for Cloudfoundry. | `any` | n/a | yes |
| <a name="input_env"></a> [env](#input\_env) | The settings object for this environment. | `any` | n/a | yes |
| <a name="input_secrets"></a> [secrets](#input\_secrets) | Sensitive credentials to be used to set application environmental variables. | `map` | `{}` | no |
| <a name="input_services"></a> [services](#input\_services) | Services generated from the service module. | `any` | <pre>{<br>  "instance": null,<br>  "service_key": null,<br>  "user_provided": null<br>}</pre> | no |

## Outputs

| Name | Description |
|------|-------------|
| <a name="output_apps"></a> [apps](#output\_apps) | A `map` of [cloudfoundry\_app](https://registry.terraform.io/providers/cloudfoundry-community/cloudfoundry/latest/docs/resources/app) resource outputs. The key is the app name. |
| <a name="output_external_endpoints"></a> [external\_endpoints](#output\_external\_endpoints) | A map of external URL's (app.cloud.gov) to used to reach an application. The key is the app name. |
| <a name="output_internal_endpoints"></a> [internal\_endpoints](#output\_internal\_endpoints) | A map of internal URL's (apps.internal) to used to reach an application. The key is the app name. |

## Example

```terraform
module "applications" {
  source = "./modules/application"

  cloudfoundry = local.cloudfoundry
  env = local.env
  secrets = local.secrets
  services = local.services
}
```

## Variables

### cloudfoundry

A variable that contains a `map(string)` of data lookups for pre-existing resources from Cloud.gov. This includes thing such as the organization and space ids. These are defined in `data.tf` in the root directory.

### env

A mixed type `object` variable that contains application settings. It is passed as an `any` type to allow optional variables to be ommitted from the object. It is defined in `locals.tf`, in the root directory. The object `local.env[terraform.workspace].apps` stores the values for the specific application that is to be deployed.

Valid options are the attributes for the [cloudfoundry\_app](https://registry.terraform.io/providers/cloudfoundry-community/cloudfoundry/latest/docs/resources/app) resource.

### secrets

A variable that has secrets and other credentials that the application uses. The `local.secrets` variable is generated in `locals_dynamic.tf`, as it merges a variety of credentials from the random and services modules.

### services

A variable that contains a `map(map(string))` of the services deployed in the environment. `local.services` is generated in `locals_dynamic.tf`, due to needing to be generated after the creation of the services, after the instance id are known. The services are then bound to the application.

See the [service module](../service/readme.MD) for more information.

## Usage

Here is an example of how to define an application in `locals.tf`.

```terraform
locals {
  env = {
    workspace1 = {
      apps = {
        application1 = {
          buildpacks = [
            "staticfile_buildpack"
          ]
          command = "./start"
          disk_quota = 256
          enable_ssh = true
          environment = {
            environment = terraform.workspace
            LD_LIBRARY_PATH = "/home/vcap/deps/0/lib/"      
          }
          health_check_timeout = 180
          health_check_type = "port"
          instances = 1
          labels = {
            environment = terraform.workspace
          }
          memory        = 64
          port          = 8080
          public_route  = false

          source        = "/path/to/application/directory"

          templates     = [
            {
              source      = "${path.cwd}/path/to/templates/template.tmpl"
              destination = "${path.cwd}}/path/to/templates/file"
            }
          ]
        }
      }
    }
  }
}
```

## Additional Notes

- Buildpacks
    - Valid built-in Cloud.gov buildpacks can be found by running `cf buildpacks` from the CLI.
    - External buildpacks, such as the `apt-buildpack` by referencing the URL to the buildpack repository: [https://github.com/cloudfoundry/apt-buildpack](https://github.com/cloudfoundry/apt-buildpack).
<!-- END_TF_DOCS -->