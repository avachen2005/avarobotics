package test

import (
	"fmt"
	"os"
	"path/filepath"
	"testing"

	"github.com/gruntwork-io/terratest/modules/terraform"
	"github.com/stretchr/testify/assert"
)

// TestTerraformValidateAllModules runs terraform validate on every module.
func TestTerraformValidateAllModules(t *testing.T) {
	t.Parallel()

	modules := []string{
		"networking",
		"security",
		"storage",
		"logging",
		"loadbalancing",
		"iam",
		"cognito",
	}

	for _, mod := range modules {
		mod := mod // capture range variable
		t.Run(mod, func(t *testing.T) {
			t.Parallel()

			modulePath := filepath.Join("..", "modules", mod)

			terraformOptions := terraform.WithDefaultRetryableErrors(t, &terraform.Options{
				TerraformDir: modulePath,
				NoColor:      true,
			})

			// init with -backend=false so no remote state is needed
			terraform.RunTerraformCommand(t, terraformOptions, "init", "-backend=false")
			terraform.Validate(t, terraformOptions)
		})
	}
}

// TestTerraformFmtCheck verifies all Terraform files are properly formatted.
func TestTerraformFmtCheck(t *testing.T) {
	t.Parallel()

	dirs := []struct {
		name string
		path string
	}{
		{"modules", filepath.Join("..", "modules")},
		{"environments", filepath.Join("..", "environments")},
	}

	for _, dir := range dirs {
		dir := dir
		t.Run(dir.name, func(t *testing.T) {
			t.Parallel()

			// Verify the directory exists before checking
			_, err := os.Stat(dir.path)
			if os.IsNotExist(err) {
				t.Skipf("Directory %s does not exist, skipping fmt check", dir.path)
				return
			}

			exitCode := terraform.GetExitCodeForTerraformCommand(t, &terraform.Options{
				TerraformDir: dir.path,
				NoColor:      true,
			}, "fmt", "-check", "-recursive")

			assert.Equal(t, 0, exitCode, fmt.Sprintf("terraform fmt -check failed for %s — run 'terraform fmt -recursive' to fix", dir.path))
		})
	}
}
