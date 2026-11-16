##############################################################
# outputs.tf
# Key attributes exposed after pipeline provisioning
##############################################################

output "pipeline_name" {
  description = "Name of the CodePipeline"
  value       = aws_codepipeline.app_pipeline.name
}

output "pipeline_arn" {
  description = "ARN of the CodePipeline"
  value       = aws_codepipeline.app_pipeline.arn
}

output "artifact_bucket" {
  description = "S3 bucket used for pipeline artifacts"
  value       = aws_s3_bucket.pipeline_artifacts.bucket
}

output "codestar_connection_arn" {
  description = "ARN of the CodeStar connection (must be authorized in the AWS Console)"
  value       = aws_codestarconnections_connection.github.arn
}

output "pipeline_console_url" {
  description = "Direct link to the pipeline in the AWS Console"
  value       = "https://${var.aws_region}.console.aws.amazon.com/codesuite/codepipeline/pipelines/${aws_codepipeline.app_pipeline.name}/view?region=${var.aws_region}"
}
