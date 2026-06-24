# Sequence Diagrams
This directory contains the system interaction flows for the TableLogic application. 
These diagrams visualize the "ping-pong" communication between the Frontend, the Express API, and the PostgreSQL database. (05/23/2026)

## Changelog (Week 7)
* **Login Sequence Update:** Updated the login flow to reflect the current MVP implementation, demonstrating that authentication is handled purely via React local state (`isLoggedIn`) without an external API call.
* **Status Update Sequence:** Modified the table status update sequence to match the actual implemented Axios route: `PATCH /api/tables/:id` sending an `is_occupied` boolean payload.
* **Error Handling:** Added an `alt` frame showing the frontend catching a database/network error and rendering the specific retry UI component coded in `App.jsx`.