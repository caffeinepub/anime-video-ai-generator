# Specification

## Summary
**Goal:** Make prompt-based story video generation work end-to-end using a real persisted backend job with backend-driven status/progress and a completed result URL.

**Planned changes:**
- Frontend: Replace mock jobId creation in Storyboard Preview with a real create-job call; use the returned backend jobId to navigate into the generation flow and handle create-job errors with an English message while staying on the preview step.
- Backend: Extend the VideoJob model and job creation API to persist the user’s prompt (or a title derived from it) on the job record, maintaining existing auth checks.
- Backend: Add a backend-driven simulated generation lifecycle (start generation, progress over time via stored or computed progress, completion sets status=completed and provides a non-null resultUrl).
- Frontend: Update GenerationRunner to poll and render status/progress/result from the backend job record (including resultUrl for preview/download) while keeping share link behavior based on jobId with English text.

**User-visible outcome:** A user can enter a prompt, start generation to create a real job, see progress and status update based on the backend job state, and receive a completed result video URL for preview/download (with a shareable job link).
