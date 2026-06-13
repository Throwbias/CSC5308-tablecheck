# Component Diagram

This diagram outlines the major logical building blocks of the TableLogic application and how they communicate. 

**Key Architectural Elements:**
* **Frontend:** React Single Page Application (Vite) containing the Map UI and Host Dashboard.
* **Backend:** Express REST API acting as the central engine, broken into the Application Layer and Data Access Layer.
* **Database:** PostgreSQL database storing the table records.
* **Protocols:** The frontend communicates with the backend via HTTPS/REST, and the backend communicates with the database via SQL/TCP.