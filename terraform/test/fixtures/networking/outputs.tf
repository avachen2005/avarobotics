output "vpc_id" {
  value = module.networking.vpc_id
}

output "vpc_cidr" {
  value = module.networking.vpc_cidr
}

output "public_subnet_ids" {
  value = module.networking.public_subnet_ids
}

output "public_subnet_cidrs" {
  value = module.networking.public_subnet_cidrs
}

output "internet_gateway_id" {
  value = module.networking.internet_gateway_id
}

output "public_route_table_id" {
  value = module.networking.public_route_table_id
}
