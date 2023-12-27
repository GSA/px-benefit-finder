variable "circleci_token" {
  description = "CircleCI token."
  type        = string
  sensitive   = true
}

variable "cloudgov_username" {
  description = "The username for the cloudfoundry account."
  type        = string
  sensitive   = true
}

variable "cloudgov_password" {
  description = "The password for the cloud.gov account."
  type        = string
  sensitive   = true
}

variable "mtls_port" {
  description = "The default port to direct traffic to. Envoy proxy listens on 61443 and redirects to 8080, which the application should listen on."
  type        = number
  default     = 61443
}

variable "newrelic_key" {
  description = "The API key for New Relic."
  type        = string
  sensitive   = true
}

variable "no_proxy" {
  description = "URIs that shouldn't be using the proxy to communicate."
  type        = string
  default     = "apps.internal,localhost,127.0.0.1"
}

variable "proxy_password" {
  description = "The proxy password."
  type        = string
  sensitive   = true
}

variable "proxy_username" {
  description = "The proxy username."
  type        = string
  sensitive   = true
}

# variable "sso_x509_cert" {
#   description = "x509 cert used for Secure Auth SSO."
#   type        = string
#   sensitive   = true
# }

# may be needed for bootstrap but variables have been removed
#variable "backup_aws_bucket_name" {
#description = "The S3 bucket used for persistent file backups."
#type        = string
#sensitive   = true
#}

#variable "backup_aws_region_name" {
#description = "The S3 region used for persistent file backups."
#type        = string
#sensitive   = true
#}

#variable "backend_aws_bucket_name" {
#description = "The S3 bucket used for persistent file backends."
#type        = string
#sensitive   = true
#}

#variable "backend_aws_region_name" {
#description = "The S3 region used for persistent file backends."
#type        = string
#sensitive   = true
#}
