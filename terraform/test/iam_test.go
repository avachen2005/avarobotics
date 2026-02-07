package test

import (
	"testing"

	"github.com/avarobotics/avarobotics/terraform/test/helpers"
	"github.com/gruntwork-io/terratest/modules/terraform"
)

// TestIAMPlan validates the IAM module configuration with terraform plan.
func TestIAMPlan(t *testing.T) {
	t.Parallel()

	terraformOptions := terraform.WithDefaultRetryableErrors(t, &terraform.Options{
		TerraformDir: "fixtures/iam",
		Vars:         helpers.IAMVars(),
		NoColor:      true,
	})

	terraform.InitAndPlan(t, terraformOptions)
}
