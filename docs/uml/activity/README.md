# activity
This diagram outlines the process flow from start to finish. (05/23/2026)
Place your activity diagrams here.

## Changelog (Week 7)
* **Process Flow Correction:** Updated the "Toggle Table Status" flow to reflect the actual `PATCH` request method.
* **Scope Reduction:** Removed the JWT token validation steps from the Express server swimlane, as backend authentication is currently deferred.
* **Error State Added:** Modeled the specific frontend error state where the user is presented with a red error block and a "Retry" button (matching `App.jsx` logic).