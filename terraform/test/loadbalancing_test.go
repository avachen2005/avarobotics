package test

import (
	"testing"

	"github.com/avarobotics/avarobotics/terraform/test/helpers"
	"github.com/gruntwork-io/terratest/modules/terraform"
)

// TestLoadbalancingPlan validates the loadbalancing module configuration with terraform plan.
func TestLoadbalancingPlan(t *testing.T) {
	t.Parallel()

	terraformOptions := terraform.WithDefaultRetryableErrors(t, &terraform.Options{
		TerraformDir: "fixtures/loadbalancing",
		Vars:         helpers.LoadbalancingVars(),
		NoColor:      true,
	})

	terraform.InitAndPlan(t, terraformOptions)
}
