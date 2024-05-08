## Usage

```terraform
module "certificates" {
  source = "./modules/certificates"

  project_name  = local.env.project
  workspace     = local.env.bootstrap_workspace
}
```
