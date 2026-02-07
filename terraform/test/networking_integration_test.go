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

// TestNetworkingIntegration deploys and destroys real networking resources.
func TestNetworkingIntegration(t *testing.T) {
	t.Parallel()

	uniqueID := strings.ToLower(random.UniqueId())
	vars := helpers.NetworkingVars()
	vars["project_name"] = fmt.Sprintf("tt-%s", uniqueID)

	terraformOptions := terraform.WithDefaultRetryableErrors(t, &terraform.Options{
		TerraformDir: "fixtures/networking",
		Vars:         vars,
		NoColor:      true,
	})

	defer terraform.Destroy(t, terraformOptions)

	terraform.InitAndApply(t, terraformOptions)

	// Assert VPC was created
	vpcID := terraform.Output(t, terraformOptions, "vpc_id")
	assert.True(t, strings.HasPrefix(vpcID, "vpc-"), "VPC ID should start with vpc-")

	// Assert subnets were created
	subnetIDs := terraform.OutputList(t, terraformOptions, "public_subnet_ids")
	assert.Len(t, subnetIDs, 2, "Should have 2 public subnets")

	// Assert CIDR matches input
	vpcCIDR := terraform.Output(t, terraformOptions, "vpc_cidr")
	assert.Equal(t, helpers.TestCIDR, vpcCIDR, "VPC CIDR should match input")
}
