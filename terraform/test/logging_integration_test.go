//go:build integration

package test

import (
	"fmt"
	"strings"
	"testing"

	"github.com/avarobotics/avarobotics/terraform/test/helpers"
	"github.com/gruntwork-io/terratest/modules/random"
	"github.com/gruntwork-io/terratest/modules/terraform"
	"github.com/stretchr/testify/assert"
)

// TestLoggingIntegration deploys and destroys real CloudWatch log group resources.
func TestLoggingIntegration(t *testing.T) {
	t.Parallel()

	uniqueID := strings.ToLower(random.UniqueId())
	vars := helpers.LoggingVars()
	vars["project_name"] = fmt.Sprintf("tt-%s", uniqueID)

	terraformOptions := terraform.WithDefaultRetryableErrors(t, &terraform.Options{
		TerraformDir: "fixtures/logging",
		Vars:         vars,
		NoColor:      true,
	})

	defer terraform.Destroy(t, terraformOptions)

	terraform.InitAndApply(t, terraformOptions)

	// Assert log group was created
	logGroupName := terraform.Output(t, terraformOptions, "api_log_group_name")
	assert.NotEmpty(t, logGroupName, "API log group name should not be empty")

	logGroupARN := terraform.Output(t, terraformOptions, "api_log_group_arn")
	assert.NotEmpty(t, logGroupARN, "API log group ARN should not be empty")
}
