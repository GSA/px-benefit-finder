variable "env" {
  description = "The settings object for this environment."
  type = any
}

variable "project_name" {
  description = "The project name."
  type = string
}

variable "workspace" {
  description = "Workspace to generate certificates in."
  type = string
}