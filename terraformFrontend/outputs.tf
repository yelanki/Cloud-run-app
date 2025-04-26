output "frontend_url" {
  description = "The URL of the deployed frontend service"
  value       = google_cloud_run_service.frontend.status[0].url
}
