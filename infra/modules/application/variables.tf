variable "cloudfoundry" {
  description = "The settings object for Cloudfoundry."
  type = any
}

variable "env" {
  description = "The settings object for this environment."
  type = any
}

variable "secrets" {
  description = "Sensitive credentials to be used to set application environmental variables."
  type = map
  default = {}
}

variable "services" {
  description = "Services generated from the service module."
  type = any
  default = {
    instance = null
    user_provided = null
    service_key = null
  }
}