locals {
  is_deployment_workspace = terraform.workspace == var.workspace ? true : false
}

resource "tls_private_key" "this" {
  count = !local.is_deployment_workspace ? 1 : 0
  algorithm = "RSA"
  rsa_bits = 4096
}

resource "tls_self_signed_cert" "this" {
  count = !local.is_deployment_workspace ? 1 : 0
  private_key_pem = tls_private_key.this[0].private_key_pem

  is_ca_certificate = true

  subject {
    country             = "US"
    province            = "Washington"
    locality            = "DC"
    common_name         = "${var.project_name} CA"
    organization        = "${var.project_name}"
    organizational_unit = "${var.project_name}"
  }

  validity_period_hours = try(var.env.certificate_authority_validity, 8766)
  early_renewal_hours = try(var.env.certificate_authority_renewal, 1461)
  allowed_uses = [
    "digital_signature",
    "cert_signing",
    "crl_signing",
  ]
}
