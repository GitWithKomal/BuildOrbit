##############################################################
# variables.tf
# Input variables for AWS CodePipeline provisioning
##############################################################

variable "aws_region" {
  description = "AWS region for all pipeline resources"
  type        = string
  default     = "ap-south-1"
}

variable "project_name" {
  description = "Prefix used to name all pipeline resources (e.g. S3 bucket, IAM roles)"
  type        = string
  default     = "cloudtrain-webapp"
}

variable "github_repo_id" {
  description = "GitHub repository in 'owner/repo' format (e.g. 'myorg/cloudtrain-cicd-kubernetes-project')"
  type        = string
}

variable "github_branch" {
  description = "Branch to monitor for source changes"
  type        = string
  default     = "main"
}

variable "eks_cluster_name" {
  description = "Name of the target EKS cluster for deployments"
  type        = string
  default     = "mycluster"
}

variable "ecr_registry" {
  description = "Full ECR registry URI (e.g. 'AWS_ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com')"
  type        = string
  default     = "AWS_ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com"
}

variable "enable_manual_approval" {
  description = "Insert a manual approval stage between Build and Deploy"
  type        = bool
  default     = true
}

variable "environment" {
  description = "Environment tag applied to all resources (e.g. dev, staging, prod)"
  type        = string
  default     = "dev"
}
