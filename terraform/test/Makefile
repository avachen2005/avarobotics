.PHONY: test test-validate test-plan test-integration

# Default: validate + plan (suitable for CI)
test: test-validate test-plan

# Static validation only — no AWS credentials required
test-validate:
	go test -v -run "TestTerraformValidate|TestTerraformFmtCheck" -timeout 10m ./...

# Plan-only tests — requires AWS credentials, but creates no resources
test-plan:
	go test -v -run "Test.*Plan$$" -timeout 30m ./...

# Integration tests — deploys and destroys real AWS resources
test-integration:
	go test -v -tags integration -run "Test.*Integration$$" -timeout 60m ./...
