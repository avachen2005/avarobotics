# Feature Specification: AWS API Infrastructure

**Feature Branch**: `001-aws-api-infra`
**Created**: 2026-02-01
**Status**: Draft
**Input**: User description: "i want to create an infrastructure on aws for my api service using vpc public only for now, s3, internet gateway, sg, acl, target group, alb"

## Clarifications

### Session 2026-02-01

- Q: 這個基礎設施是用於哪個環境？ → A: Multi-env (dev/staging/prod)
- Q: 目標部署在哪個 AWS Region？ → A: ap-northeast-1 (Tokyo)
- Q: 預期的流量規模是多少？ → A: Unknown - 使用 auto-scaling，根據實際流量調整
- Q: Dev 環境架構預留多少 prod 擴展性？ → A: Minimal - Dev 用最簡單架構，prod 再重新設計
- Q: Dev 環境需要 WAF 嗎？ → A: No - SG + ACL 足夠，prod 再加 WAF

## User Scenarios & Testing

### User Story 1 - Deploy API Service to AWS (Priority: P1)

As a platform operator, I need to deploy the API service to AWS with proper networking and load balancing so that external clients can access the API reliably and securely.

**Why this priority**: This is the core infrastructure requirement - without the VPC, networking, and load balancer, the API service cannot be deployed or accessed by clients.

**Independent Test**: Can be fully tested by deploying a simple health-check endpoint and verifying it responds successfully through the ALB public DNS.

**Acceptance Scenarios**:

1. **Given** the infrastructure is provisioned, **When** I deploy the API service, **Then** it is accessible via the ALB public endpoint
2. **Given** a client sends a request to the ALB, **When** the request is valid, **Then** it is routed to a healthy target in the target group
3. **Given** the ALB receives traffic, **When** a target becomes unhealthy, **Then** traffic is automatically routed only to healthy targets

---

### User Story 2 - Secure Network Access (Priority: P1)

As a platform operator, I need network security controls so that only authorized traffic reaches the API service while blocking malicious or unauthorized access.

**Why this priority**: Security is critical for production infrastructure - the API must be protected from unauthorized access from initial deployment.

**Independent Test**: Can be tested by attempting connections from allowed and disallowed sources/ports and verifying access is granted or denied appropriately.

**Acceptance Scenarios**:

1. **Given** the security group is configured, **When** traffic arrives on allowed ports from allowed sources, **Then** the traffic is permitted
2. **Given** the security group is configured, **When** traffic arrives on disallowed ports, **Then** the traffic is blocked
3. **Given** the network ACL is configured, **When** traffic matches deny rules, **Then** the traffic is denied at the subnet level

---

### User Story 3 - Static Asset Storage (Priority: P2)

As a platform operator, I need S3 storage so that the API service can store and retrieve static assets, logs, or configuration files.

**Why this priority**: S3 storage supports the API but is not required for the core request/response flow to function.

**Independent Test**: Can be tested by uploading and retrieving a test file from the S3 bucket.

**Acceptance Scenarios**:

1. **Given** the S3 bucket exists, **When** the API service uploads a file, **Then** the file is stored successfully
2. **Given** a file exists in S3, **When** the API service requests the file, **Then** the file is retrieved successfully
3. **Given** the S3 bucket has access policies, **When** an unauthorized entity attempts access, **Then** access is denied

---

### User Story 4 - Centralized Logging (Priority: P2)

As a platform operator, I need centralized log collection and storage so that I can monitor API service behavior, troubleshoot issues, and maintain audit trails.

**Why this priority**: Logging is essential for operations but the API can function without it initially. Should be in place before production traffic.

**Independent Test**: Can be tested by generating API requests and verifying logs appear in the centralized logging system within the expected time window.

**Acceptance Scenarios**:

1. **Given** the logging infrastructure is configured, **When** the API service writes logs to stdout, **Then** logs are collected and stored in the centralized logging system
2. **Given** logs are being collected, **When** an operator searches for a specific request ID, **Then** the relevant log entries are returned
3. **Given** a log retention policy is configured, **When** logs exceed the retention period, **Then** old logs are automatically archived or deleted
4. **Given** the ALB receives traffic, **When** requests are processed, **Then** ALB access logs are stored for analysis

---

### Edge Cases

- What happens when all targets in the target group are unhealthy? The ALB returns a 503 Service Unavailable response.
- What happens when the S3 bucket storage quota is approached? Monitoring alerts are triggered before limits are reached.
- How does the system handle network ACL rule conflicts? Rules are evaluated in order by rule number, with the first matching rule applied.
- What happens when the Internet Gateway is detached? All inbound and outbound internet traffic is blocked, making the API inaccessible.
- What happens when the logging system is unavailable? API service continues to operate; logs are buffered locally and forwarded when connectivity is restored.
- What happens when log storage reaches capacity? Alerts are triggered and oldest logs are archived to cheaper storage (S3) based on lifecycle policy.

## Requirements

### Functional Requirements

- **FR-001**: System MUST provision a VPC with public subnets only (private subnets not required for initial deployment)
- **FR-002**: System MUST attach an Internet Gateway to the VPC to enable internet connectivity
- **FR-003**: System MUST configure route tables to route internet-bound traffic (0.0.0.0/0) through the Internet Gateway
- **FR-004**: System MUST create Security Groups to control inbound and outbound traffic at the instance level
- **FR-005**: System MUST create Network ACLs to provide an additional layer of subnet-level traffic control
- **FR-006**: System MUST provision an Application Load Balancer (ALB) in the public subnets
- **FR-007**: System MUST configure ALB listeners to accept incoming traffic on standard HTTP/HTTPS ports
- **FR-008**: System MUST create a Target Group for routing ALB traffic to API service instances
- **FR-009**: System MUST configure health checks on the Target Group to monitor API service availability
- **FR-010**: System MUST provision an S3 bucket for static asset storage
- **FR-011**: System MUST enable S3 bucket versioning to protect against accidental deletions
- **FR-012**: System MUST block public access to the S3 bucket by default
- **FR-013**: System MUST deploy resources across multiple Availability Zones for high availability (production only; dev may use single AZ)
- **FR-014**: System MUST collect container/application logs from all API service instances
- **FR-015**: System MUST store logs in a centralized, searchable logging system
- **FR-016**: System MUST configure log retention policies (short-term for active queries, long-term archive to S3)
- **FR-017**: System MUST enable ALB access logs for request/response tracking
- **FR-018**: System MUST support structured log format (JSON) for easier querying and analysis
- **FR-019**: System MUST provide log-based alerting capability for error rate thresholds
- **FR-020**: System MUST support multiple isolated environments (dev/staging/prod) with consistent infrastructure patterns
- **FR-021**: System SHOULD support auto-scaling to handle variable traffic loads (optional for dev, required for prod)
- **FR-022**: System MUST include basic CloudWatch metrics for monitoring (advanced alarms optional for dev)

### Key Entities

- **VPC**: Virtual Private Cloud network container with defined CIDR block, hosting all infrastructure resources
- **Public Subnet**: Subnet with route to Internet Gateway, deployed across multiple AZs for redundancy
- **Internet Gateway**: Enables communication between VPC resources and the internet
- **Security Group**: Stateful firewall rules controlling traffic to/from resources (instance level)
- **Network ACL**: Stateless firewall rules controlling traffic at subnet level
- **Application Load Balancer**: Layer 7 load balancer distributing traffic across API instances
- **Target Group**: Collection of targets (API instances) for ALB traffic routing with health check configuration
- **S3 Bucket**: Object storage for static assets, logs, and configuration files
- **Log Collector**: Agent running on each node that collects container stdout/stderr and forwards to centralized storage
- **Log Storage**: Centralized system for storing, indexing, and querying application and infrastructure logs
- **Log Archive**: Long-term storage for compliance and historical analysis (S3-based)

## Success Criteria

### Measurable Outcomes

- **SC-001**: API service is accessible from the public internet through the ALB within 5 seconds of request initiation
- **SC-002**: Infrastructure deployment completes successfully and reproducibly (can be destroyed and recreated with identical results)
- **SC-003**: ALB health checks correctly identify unhealthy targets and remove them from rotation within the configured health check interval
- **SC-004**: Network security controls block 100% of traffic on unauthorized ports while allowing 100% of legitimate traffic
- **SC-005**: S3 bucket operations (upload/download of files up to 100MB) complete successfully
- **SC-006**: Infrastructure spans at least 2 Availability Zones for fault tolerance
- **SC-007**: All infrastructure changes are tracked and auditable through infrastructure-as-code version control
- **SC-008**: Application logs appear in centralized logging system within 30 seconds of being generated
- **SC-009**: Operators can search and retrieve logs by request ID, time range, or error level
- **SC-010**: Log retention automatically archives logs older than 7 days to long-term storage
- **SC-011**: Each PR contains no more than 500 lines of changes
- **SC-012**: Each PR includes documented verification steps that can be executed independently

## Development Process Constraints

### PR Size Limits
- Each Pull Request MUST NOT exceed **500 lines** of code changes
- If a feature requires more than 500 lines, it MUST be split into multiple PRs
- PRs should be focused on a single logical change

### Verification Requirements
- Each PR MUST include a **verification method** describing how to test the changes
- Verification methods may include:
  - Manual testing steps
  - Automated test commands
  - Infrastructure validation commands (e.g., `terraform plan`, `terraform validate`)
  - Curl/API test commands
  - Log verification steps

### PR Template
Each PR should document:
1. **What changed**: Brief description of the change
2. **How to verify**: Step-by-step verification instructions
3. **Rollback plan**: How to undo if something goes wrong

## Assumptions

- Infrastructure supports multiple environments (dev/staging/prod) via Terraform workspaces or separate state files
- **Initial scope: dev environment only** - minimal architecture (single AZ acceptable, no auto-scaling required)
- Production environment will be designed separately with full HA requirements (multi-AZ, auto-scaling, WAF)
- Each environment will have isolated VPC, ALB, S3, and logging resources
- Environment-specific naming convention: `{env}-{resource}` (e.g., `dev-api-alb`, `prod-api-alb`)
- The API service will be deployed as containerized workloads or EC2 instances (compute layer to be added later)
- HTTP (port 80) and HTTPS (port 443) are the primary ports for ALB listeners
- The VPC CIDR block will use a non-overlapping private IP range (e.g., 10.0.0.0/16)
- S3 bucket naming will follow organizational naming conventions
- The infrastructure will be deployed to ap-northeast-1 (Tokyo) region, with 3 Availability Zones available (ap-northeast-1a, 1c, 1d)
- SSL/TLS certificates for HTTPS will be managed through AWS Certificate Manager
- DNS configuration will be handled separately or through Route 53 in a future iteration
- CloudWatch Logs will be used for centralized logging (integrated with AWS ecosystem)
- Fluent Bit will be used as the log collector (lightweight, AWS-recommended for EKS)
- Log retention: 7 days in CloudWatch, then archived to S3 for long-term storage
- API service will output logs in JSON format to stdout
