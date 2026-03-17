# Issue Tracking Backend API

Minimal Node.js + Express Issue Tracking API demonstrating clean architecture and feature-based organization.

## Tech Stack

- Node.js
- Express
- Joi (validation)

## Project Structure

```text
src/
  index.js                 # Server entrypoint
  app.js                   # Express app & middleware wiring
  common/
    utils/
      responseHandler.js   # Standard success/error response helpers
      httpError.js         # Reusable HTTP error factory
    middleware/
      errorHandler.js      # Global error handler
  features/
    issues/
      issue.routes.js      # /issues routes
      issue.controller.js  # HTTP controllers
      issue.service.js     # Business logic
      issue.model.js       # In-memory persistence
      issue.validation.js  # Joi validation middleware
```

## Getting Started

### 1. Install dependencies

From the project root:

```bash
npm install
```

### 2. Run the server

```bash
npm run dev
```

The API will start on `http://localhost:3000`.

## API Overview

Base path: `http://localhost:3000`

### Create Issue

- **URL**: `POST /issues`
- **Body (JSON)**:

```json
{
  "title": "First issue",
  "status": "open",
  "priority": "high",
  "assignedTo": "alice"
}
```

- **Notes**:
  - `title` is required and must be unique (case-insensitive).
  - `status`: `"open" | "in-progress" | "closed"` (default `"open"`).
  - `priority`: `"low" | "medium" | "high"` (default `"medium"`).

### List Issues

- **URL**: `GET /issues`
- **Body**: none

### Update Issue

- **URL**: `PATCH /issues/:id`
- **Body (JSON)**: any combination of

```json
{
  "title": "Updated title",
  "status": "in-progress",
  "priority": "medium",
  "assignedTo": "bob"
}
```

- **Rules**:
  - At least one field must be provided.
  - If all provided fields already match the existing values, the API returns a `400` error.
  - If the issue does not exist, the API returns a `404` error.

## Validation & Error Handling

- Joi is used in `issue.validation.js` to validate:
  - Request bodies for create and update.
  - Route params for numeric `id`.
- Validation and domain errors are normalized via:
  - `httpError(status, message)` for throwing errors in services.
  - `errorHandler` middleware + `responseHandler.errorResponse` for consistent JSON:

```json
{
  "success": false,
  "message": "Error message",
  "data": null
}
```

## Postman Collection

A Postman collection is included at `IssueTracking.postman_collection.json`.

To use it:

1. Start the server with `npm run dev`.
2. In Postman, click **Import** → **Upload Files** and select `IssueTracking.postman_collection.json`.
3. Use the `Create Issue`, `List Issues`, and `Update Issue` requests to interact with the API.

