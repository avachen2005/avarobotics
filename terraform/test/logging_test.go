package test

import (
	"testing"

	"github.com/avarobotics/avarobotics/terraform/test/helpers"
	"github.com/gruntwork-io/terratest/modules/terraform"
)

// TestLoggingPlan validates the logging module configuration with terraform plan.
func TestLoggingPlan(t *testing.T) {
	t.Parallel()

	terraformOptions := terraform.WithDefaultRetryableErrors(t, &terraform.Options{
		TerraformDir: "fixtures/logging",
		Vars:         helpers.LoggingVars(),
		NoColor:      true,
	})

	terraform.InitAndPlan(t, terraformOptions)
}
