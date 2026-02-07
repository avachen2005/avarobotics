package test

import (
	"testing"

	"github.com/avarobotics/avarobotics/terraform/test/helpers"
	"github.com/gruntwork-io/terratest/modules/terraform"
)

// TestSecurityPlan validates the security module configuration with terraform plan.
func TestSecurityPlan(t *testing.T) {
	t.Parallel()

	terraformOptions := terraform.WithDefaultRetryableErrors(t, &terraform.Options{
		TerraformDir: "fixtures/security",
		Vars:         helpers.SecurityVars(),
		NoColor:      true,
	})

	terraform.InitAndPlan(t, terraformOptions)
}
