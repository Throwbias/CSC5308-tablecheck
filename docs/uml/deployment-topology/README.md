# Deployment Topology

This diagram models the physical infrastructure and hosting environments for the TableLogic application.

**Key Environments:**
* **Local Development:** Developer machines running Vite and Node/Express servers.
* **Version Control:** The central GitHub repository acting as the source of truth and triggering CI/CD pipelines.
* **Production Cloud:** * **Render.com:** Hosts the Node.js/Express backend API.
  * **Neon.tech:** Hosts the managed PostgreSQL database.