output "backend_url" {
  description = "The URL of the deployed backend service"
  value       = google_cloud_run_service.backend.status[0].url
}
