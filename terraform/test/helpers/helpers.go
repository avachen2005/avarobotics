// Package helpers provides shared constants and variable builders for Terratest tests.
package helpers

const (
	DefaultAWSRegion   = "ap-northeast-1"
	DefaultEnvironment = "dev"
	DefaultProjectName = "avarobotics"
	TestCIDR           = "10.99.0.0/16"
	TestSubnetCIDR1    = "10.99.1.0/24"
	TestSubnetCIDR2    = "10.99.2.0/24"
	TestAZ1            = "ap-northeast-1a"
	TestAZ2            = "ap-northeast-1c"
)

// NetworkingVars returns test variables for the networking module.
func NetworkingVars() map[string]interface{} {
	return map[string]interface{}{
		"environment":         DefaultEnvironment,
		"project_name":        DefaultProjectName,
		"vpc_cidr":            TestCIDR,
		"public_subnet_cidrs": []string{TestSubnetCIDR1, TestSubnetCIDR2},
		"availability_zones":  []string{TestAZ1, TestAZ2},
	}
}

// SecurityVars returns test variables for the security module.
// Uses placeholder IDs valid for terraform plan (not apply).
func SecurityVars() map[string]interface{} {
	return map[string]interface{}{
		"environment":       DefaultEnvironment,
		"project_name":      DefaultProjectName,
		"vpc_id":            "vpc-00000000000000000",
		"public_subnet_ids": []string{"subnet-00000000000000001", "subnet-00000000000000002"},
		"alb_ingress_ports": []int{80},
		"app_port":          8080,
	}
}

// StorageVars returns test variables for the storage module.
func StorageVars() map[string]interface{} {
	return map[string]interface{}{
		"environment":   DefaultEnvironment,
		"project_name":  "terratest-" + DefaultProjectName,
		"force_destroy": true,
	}
}

// LoggingVars returns test variables for the logging module.
func LoggingVars() map[string]interface{} {
	return map[string]interface{}{
		"environment":        DefaultEnvironment,
		"project_name":       DefaultProjectName,
		"log_retention_days": 7,
		"create_vpc_flow_logs": false,
	}
}

// LoadbalancingVars returns test variables for the loadbalancing module.
// Uses placeholder IDs valid for terraform plan (not apply).
func LoadbalancingVars() map[string]interface{} {
	return map[string]interface{}{
		"environment":        DefaultEnvironment,
		"project_name":       DefaultProjectName,
		"vpc_id":             "vpc-00000000000000000",
		"public_subnet_ids":  []string{"subnet-00000000000000001", "subnet-00000000000000002"},
		"security_group_ids": []string{"sg-00000000000000001"},
		"enable_access_logs": false,
	}
}

// IAMVars returns test variables for the IAM module.
func IAMVars() map[string]interface{} {
	return map[string]interface{}{
		"environment":   DefaultEnvironment,
		"project_name":  DefaultProjectName,
		"allowed_users": []string{"arn:aws:iam::123456789012:user/test_user"},
	}
}

// EcsVars returns test variables for the ECS module.
// Uses placeholder IDs valid for terraform plan (not apply).
func EcsVars() map[string]interface{} {
	return map[string]interface{}{
		"environment":        DefaultEnvironment,
		"project_name":       DefaultProjectName,
		"ecr_repository_url": "123456789012.dkr.ecr.ap-northeast-1.amazonaws.com/dev-avarobotics-api",
		"target_group_arn":   "arn:aws:elasticloadbalancing:ap-northeast-1:123456789012:targetgroup/dev-avarobotics-tg/0000000000000000",
		"subnet_ids":         []string{"subnet-00000000000000001", "subnet-00000000000000002"},
		"security_group_ids": []string{"sg-00000000000000001"},
		"log_group_name":     "/ecs/dev-avarobotics-api",
	}
}

// CodebuildVars returns test variables for the codebuild module.
func CodebuildVars() map[string]interface{} {
	return map[string]interface{}{
		"environment":      DefaultEnvironment,
		"project_name":     DefaultProjectName,
		"github_repo":      "https://github.com/avachen2005/avarobotics.git",
		"github_repo_name": "avachen2005/avarobotics",
		"ecr_repo_name":    DefaultProjectName + "-api",
	}
}
