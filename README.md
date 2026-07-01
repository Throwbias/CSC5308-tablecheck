# TableLogic
> A full-stack table management and status tracking application for modern restaurant operations.

## Table of Contents
* [Overview](#overview)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)
* [Running Tests](#running-tests)
* [Project Structure](#project-structure)
* [Contributing](#contributing)
* [Team](#team)
* [License](#license)

## Overview
TableLogic is a web-based application designed to help restaurant staff track table availability in real-time. By utilizing a visual interface with green/red color logic, hosts and servers can instantly identify open tables, update statuses, and manage the dining floor efficiently. 

## Tech Stack
| Layer | Technology | Version |
| --- | --- | --- |
| Frontend | React (Vite) | 18.x |
| Backend | Node.js / Express | 20.x |
| Database | PostgreSQL (NeonDB) | 15.x |
| Hosting | Vercel (Frontend) / Render (Backend) | - |
| CI/CD | GitHub Actions | V1 |

## Getting Started

### Prerequisites
Before you begin, ensure you have the following installed:
* Node.js (v20.x or higher)
* npm (v10.x or higher)

### Installation
Step 1: Clone the repository
`git clone https://github.com/TableLogic/mcs5308-tablecheck.git`
`cd mcs5308-tablecheck`

Step 2: Install dependencies
`npm install` (in the root directory for the backend)
`cd frontend && npm install` (for the frontend)

Step 3: Set up environment variables
* Copy `.env.example` to `.env` in the root directory.
* Edit `.env` with your Neon PostgreSQL connection string and local configuration values.

### Database Setup
To initialize the database schema and seed the initial dummy tables:
`npm run db:setup` (or manually execute the SQL scripts in `database/schema.sql` and `database/seed.sql` using your database client).

### Running the Application
Start the backend server (from the root directory):
`npm start`

Start the frontend development server (from the `frontend/` directory):
`npm run dev`

The frontend application will be available at http://localhost:5173 and the API runs on http://localhost:3000.

## Running Tests
Run backend API tests:
`npm test`
Run frontend UI tests:
`cd frontend && npm test`
*(See /tests/README.md for more detail on the test suite structure).*

## Project Structure
mcs5308-tablecheck/
├── .github/           - GitHub templates and Actions workflows
├── docs/              - All project documentation (ADRs, UML, Vision, Wireframes)
├── database/          - SQL schema and seed files
├── frontend/          - React frontend application
├── config/            - Backend configuration (e.g., db.js)
├── tests/             - Automated test suite
├── server.js          - Express API entry point
├── .env.example       - Required environment variable template
├── .gitignore
├── CONTRIBUTING.md
├── LICENSE
└── README.md

## Contributing
Please read CONTRIBUTING.md before opening a pull request.

## Team
| Name | GitHub Handle | Role |
| --- | --- | --- |
| Aaron G. | @aarong | Frontend Lead |
| Valerie | @valerie | Backend Lead |
| [Your Name] | @[YourHandle] | DevOps Lead / Full Stack |

## License
This project is licensed under the MIT License – see the LICENSE file for details.