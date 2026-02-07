package test

import (
	"testing"

	"github.com/avarobotics/avarobotics/terraform/test/helpers"
	"github.com/gruntwork-io/terratest/modules/terraform"
)

// TestCodebuildPlan validates the codebuild module configuration with terraform plan.
func TestCodebuildPlan(t *testing.T) {
	t.Parallel()

	terraformOptions := terraform.WithDefaultRetryableErrors(t, &terraform.Options{
		TerraformDir: "fixtures/codebuild",
		Vars:         helpers.CodebuildVars(),
		NoColor:      true,
	})

	terraform.InitAndPlan(t, terraformOptions)
}
