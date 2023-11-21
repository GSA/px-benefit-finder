terraform {
  required_providers {
    cloudfoundry = {
      source  = "cloudfoundry-community/cloudfoundry"
      version = "0.51.2"
    }
  }
  required_version = "> 1.4"
}
