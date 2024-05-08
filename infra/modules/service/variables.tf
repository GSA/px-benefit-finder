variable "cloudfoundry" {
  description = "Cloudfoundry settings."
  type = any
}

variable "env" {
  description = "The settings map for this environment."
  type = any
}

variable "passwords" {
  description = "Sensitive strings to be added to the apps environmental variables."
  type = map
  default = {}
}

variable "skip_service_instances" {
  description = "Allows the skipping of service instances. Useful to inject service secrets into a user provided secret."
  type = bool
  default = false
}

variable "skip_user_provided_services" {
  description = "Allows the skipping of user provided services. Useful to inject service secrets into a user provided secret."
  type = bool
  default = false
}

variable "secrets" {
  description = "Sensitive strings to be added to the apps environmental variables."
  type = map
  default = {}
}