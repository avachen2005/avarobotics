package test

import (
	"testing"

	"github.com/avarobotics/avarobotics/terraform/test/helpers"
	"github.com/gruntwork-io/terratest/modules/terraform"
)

// TestEcsPlan validates the ECS module configuration with terraform plan.
func TestEcsPlan(t *testing.T) {
	t.Parallel()

	terraformOptions := terraform.WithDefaultRetryableErrors(t, &terraform.Options{
		TerraformDir: "fixtures/ecs",
		Vars:         helpers.EcsVars(),
		NoColor:      true,
	})

	terraform.InitAndPlan(t, terraformOptions)
}
