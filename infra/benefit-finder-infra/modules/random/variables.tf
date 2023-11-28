variable "expiration" {
  type = number
  description = "A number, in days, when the password should be rotated. If none is set, the password will not rotate."
  default = 0
}

variable "names" {
  type = list(string)
  description = "List of unique names for the multiple resources."
  default = []
}

variable "passwords" {
  type = any
  description = "A map of objects with password settings."
}

variable "per_workspace" {
  type = bool
  description = "Generate a password for each workspace."
  default = false
}