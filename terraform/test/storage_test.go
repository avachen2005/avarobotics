package test

import (
	"testing"

	"github.com/avarobotics/avarobotics/terraform/test/helpers"
	"github.com/gruntwork-io/terratest/modules/terraform"
)

// TestStoragePlan validates the storage module configuration with terraform plan.
func TestStoragePlan(t *testing.T) {
	t.Parallel()

	terraformOptions := terraform.WithDefaultRetryableErrors(t, &terraform.Options{
		TerraformDir: "fixtures/storage",
		Vars:         helpers.StorageVars(),
		NoColor:      true,
	})

	terraform.InitAndPlan(t, terraformOptions)
}
