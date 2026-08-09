# Refactoring Log

## Refactoring 1: Remove Duplicate app.listen Startup Block
**Debt Item Addressed:** TD-002
**Date:** August 9, 2026


**What Changed:**
Removed the duplicated `app.listen` block early in `server.js`. Retained the existing, centralized bootstrap block at the bottom of the file without altering any middleware or routes.

**Before:**
`server.js` contained two identical `app.listen` calls binding to the same port. This caused the server startup logic to execute twice, logging "Server is running on port 3000" multiple times and creating a race condition for the port binding.

**After:**
`server.js` contains exactly one `app.listen` block at the bottom of the file, providing a single, clean entry point for the application to start.

**Why This Improves the Code:**
Removing the duplicate block eliminates the risk of an `EADDRINUSE` (Address already in use) crash during deployment and centralizes the server bootstrap configuration in one predictable location.

**Tests:**
The structural check confirmed exactly one `app.listen` remains. The existing Jest test suite was run, and all 10 tests passed successfully. No new tests were required as the observable behavior (the server booting) remains unchanged.

---

## Refactoring 2: Add Missing Error Handler to Postgres Connection Pool
**Debt Item Addressed:** TD-004
**Date:** August 9, 2026
**Commit / PR:** [Insert PR Link or Commit SHA]

**What Changed:**
Added a `pool.on('error', (err) => { ... })` event listener to the Postgres connection pool in `config/db.js`. The handler logs the error using `console.error` and gracefully exits the process with status 1.

**Before:**
The shared Postgres pool was instantiated without an error listener. If an idle client experienced an unexpected error (e.g., a dropped network connection), the Node process could silently crash without a controlled reporting path.

**After:**
    pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
      process.exit(1);
    });

**Why This Improves the Code:**
This change dramatically improves application reliability. Instead of silent failures, database connection drops are now caught, logged for diagnostic review, and handled deliberately.

**Tests:**
No existing database queries or pool options were altered. The full Jest test suite was run after the addition, and all 10 tests passed successfully, confirming no regressions in database connectivity.

---

## Refactoring 3: Extract Credential Validation and Form Layout from LoginScreen
**Debt Item Addressed:** TD-003
**Date:** August 9, 2026
**Commit / PR:** [Insert PR Link or Commit SHA]

**What Changed:**
Refactored `LoginScreen.jsx` by extracting the credential validation logic into a private `getCredentialError` helper function. Additionally, the massive inline-rendered login layout was extracted into a focused `<LoginForm />` presentation component. 

**Before:**
`LoginScreen.jsx` was a monolithic ~99-line component that tightly coupled component state management, input validation rules, error handling, and all presentation markup in a single function.

**After:**
Responsibilities are clearly separated. The validation rules live in a dedicated helper function, the UI layout lives in a specific presentation component, and the parent component strictly handles state and callbacks.

**Why This Improves the Code:**
Separating business logic from UI layout vastly improves maintainability and readability. Future changes to validation rules won't require digging through JSX, and styling updates can be made without risking regressions to the authentication logic. 

**Tests:**
Verified that all existing UI text, styles, state behavior, validation messages, and login callback behaviors were preserved. The frontend linting and production build passed. The root Jest suite (10 tests) passed successfully. No new functionality was added.