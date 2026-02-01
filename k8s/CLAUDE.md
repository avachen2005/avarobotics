# Kubernetes Deployments

## Conventions
- Use Helm charts for complex deployments
- Raw manifests for simple resources
- Kustomize for environment overlays

## Directory Structure
```
k8s/
├── charts/           # Helm charts
├── manifests/        # Raw K8s manifests
├── base/             # Kustomize base configs
└── overlays/         # Environment-specific overlays
    ├── dev/
    ├── staging/
    └── prod/
```

## Naming Conventions
- Namespaces: `ava-<component>` (e.g., `ava-api`, `ava-monitoring`)
- Deployments: `<service>-deployment`
- Services: `<service>-svc`
- ConfigMaps: `<service>-config`
- Secrets: `<service>-secrets`

## Resource Management
- Always set resource requests and limits
- Use PodDisruptionBudgets for production workloads
- Define health checks (liveness/readiness probes)

## Security
- Use NetworkPolicies to restrict traffic
- Run containers as non-root
- Use SecurityContexts with minimal privileges
- Store secrets in external secret manager (e.g., Vault, AWS Secrets Manager)

## Troubleshooting Commands
```bash
kubectl get pods -n <namespace>
kubectl describe pod <pod-name> -n <namespace>
kubectl logs <pod-name> -n <namespace> --tail=100
kubectl exec -it <pod-name> -n <namespace> -- /bin/sh
```
