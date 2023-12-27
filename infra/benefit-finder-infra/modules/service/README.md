<!-- BEGIN_TF_DOCS -->
# CloudFoundry Service Module

## Requirements

| Name | Version |
|------|---------|
| <a name="requirement_cloudfoundry"></a> [cloudfoundry](#requirement\_cloudfoundry) | 0.51.2 |

## Providers

| Name | Version |
|------|---------|
| <a name="provider_cloudfoundry"></a> [cloudfoundry](#provider\_cloudfoundry) | 0.51.2 |

## Modules

No modules.

## Resources

| Name | Type |
|------|------|
| [cloudfoundry_service_instance.this](https://registry.terraform.io/providers/cloudfoundry-community/cloudfoundry/0.51.2/docs/resources/service_instance) | resource |
| [cloudfoundry_service_key.this](https://registry.terraform.io/providers/cloudfoundry-community/cloudfoundry/0.51.2/docs/resources/service_key) | resource |
| [cloudfoundry_user_provided_service.this](https://registry.terraform.io/providers/cloudfoundry-community/cloudfoundry/0.51.2/docs/resources/user_provided_service) | resource |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_cloudfoundry"></a> [cloudfoundry](#input\_cloudfoundry) | Cloudfoundry settings. | `any` | n/a | yes |
| <a name="input_env"></a> [env](#input\_env) | The settings map for this environment. | `any` | n/a | yes |
| <a name="input_passwords"></a> [passwords](#input\_passwords) | Sensitive strings to be added to the apps environmental variables. | `map` | `{}` | no |
| <a name="input_secrets"></a> [secrets](#input\_secrets) | Sensitive strings to be added to the apps environmental variables. | `map` | `{}` | no |
| <a name="input_skip_service_instances"></a> [skip\_service\_instances](#input\_skip\_service\_instances) | Allows the skipping of service instances. Useful to inject service secrets into a user provided secret. | `bool` | `false` | no |
| <a name="input_skip_user_provided_services"></a> [skip\_user\_provided\_services](#input\_skip\_user\_provided\_services) | Allows the skipping of user provided services. Useful to inject service secrets into a user provided secret. | `bool` | `false` | no |

## Outputs

| Name | Description |
|------|-------------|
| <a name="output_name"></a> [name](#output\_name) | n/a |
| <a name="output_results"></a> [results](#output\_results) | n/a |

## Examples

### Basic
```terraform
module "services" {
  source = "./modules/service"

  cloudfoundry = local.cloudfoundry
  env = local.env
}
```

### Advanced

This advanced example will first generate service instances, such as RDS, along with other defined services, except for the `user defined` services. `User defined` services are useful for providing variables at runtime to applications. The issue is that until a service, such as RDS is deployed, their isn't a username and password created for that instance.

The first step is to initalize any services that are not `user defined`, but setting `skip_user_provided_services` to `true`.

```terraform
module "services" {
  source = "./modules/service"

  cloudfoundry = local.cloudfoundry
  env = local.env

  skip_user_provided_services = true
}
```

After the services are generated, another module block can be defined, which will pass a merged `map(string)` called `secrets`, that have the various information that is to be added to the `user defined` service. Setting the `skip_service_instances` to `true` will prevent the module from trying to redploy any non `user defined` service.

```terraform
module "secrets" {
  source = "./modules/service"

  cloudfoundry = local.cloudfoundry
  env = local.env

  secrets = local.secrets
  skip_service_instances = true
}
```
<!-- END_TF_DOCS -->