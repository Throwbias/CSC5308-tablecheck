# API Changelog

## v2.0.0 [August 10, 2026]

### Added
- **Rate Limiting (Option D)**: Implemented global rate limiting on all public API endpoints to prevent brute-force attacks and abuse.
  - Enforces a maximum of 10 requests per 15 minutes per IP address.
  - Exceeding the limit returns a `429 Too Many Requests` status, a `RATE_LIMITED` error code, and a `Retry-After: 900` header.

### Changed
- **Structured JSON Error Responses (Option B) [BREAKING CHANGE]**: Extracted individual controller error handling into a centralized Express middleware.
  - Why: To ensure the API provides consistent, predictable error contracts for the frontend.
  - All errors are now strictly returned in a standard format: `{ "error": { "code": "...", "message": "...", "status": ... } }`.
  - Unmatched routes now safely route through the custom error handler returning a `NOT_FOUND` code.
  - **Consumer Impact**: Any existing frontend consumers relying on the previous unstructured error strings or inconsistent JSON keys must update their error-handling logic to parse the `error.message` and `error.code` fields.