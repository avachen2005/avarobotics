package test

import (
	"testing"

	"github.com/avarobotics/avarobotics/terraform/test/helpers"
	"github.com/gruntwork-io/terratest/modules/terraform"
)

// TestNetworkingPlan validates the networking module configuration with terraform plan.
func TestNetworkingPlan(t *testing.T) {
	t.Parallel()

	terraformOptions := terraform.WithDefaultRetryableErrors(t, &terraform.Options{
		TerraformDir: "fixtures/networking",
		Vars:         helpers.NetworkingVars(),
		NoColor:      true,
	})

	terraform.InitAndPlan(t, terraformOptions)
}
