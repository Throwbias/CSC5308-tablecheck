Scope: API endpoints, authentication middleware, repository database queries, and environment configuration, as of Week 12.

## Section 1 - Executive Summary
This security review takes a closer look at the csc5308-tablecheck application, especially after its recent updates like the Model-View-Controller (MVC) refactoring, security enhancements, and expanded testing (Aufan et al., 2025; Bombarda et al., 2025). We identified two issues that are being addressed this week, along with one area where we accept some risk due to scope limits (Basu Thakur, 2025). Overall, the application shows a solid security stance, with strong authentication measures and effective defenses against query attacks (Akbar et al., 2025; Armando & Rosalina, 2023).

## Section 2 - OWASP Top 10 Assessment

### Category: A01 Broken Access Control
Applicability: Applicable
Assessment: Mitigated
Evidence: Reviewed middleware/auth.js and protected route endpoints in routes/tableRoutes.js (Pramudia et al., 2025)
Findings: Unauthenticated or unauthorized HTTP requests attempting to access protected endpoints are successfully intercepted (Tarigan, 2026).
Mitigation Status: Mitigated via custom authentication middleware returning 401 status codes for unauthorized traffic.

### Category: A02 Cryptographic Failures
Applicability: Applicable
Assessment: Mitigated
Evidence: Inspected authentication and configuration scripts for hashing implementations and credential management.
Findings: Sensitive data configurations and tokens rely on environment variables rather than hardcoded string definitions.
Mitigation Status: Mitigated. Production secrets and tokens are loaded strictly via runtime environment configurations.

### Category: A03 Injection
Applicability: Applicable
Assessment: Mitigated
Evidence: Reviewed all database query implementations within repositories/tableRepository.js.
Findings: All database operations utilize safe parameterization patterns rather than vulnerable string concatenation (Armando & Rosalina, 2023).
Mitigation Status: Remediated this week. Raw query strings susceptible to wildcard or injection manipulation were replaced with safe parameterized equivalents.

### Category: A04 Insecure Design
Applicability: Applicable
Assessment: Mitigated
Evidence: Reviewed system modularity and architectural refactoring patterns from legacy structure to MVC (Bombarda et al., 2025).
Findings: Separation of concerns is actively maintained across controllers, services, and routes to isolate business logic.
Mitigation Status: Mitigated through formal architectural restructuring and modular design principles (Basu Thakur, 2025; Somerville, 2016).

### Category: A05 Security Misconfiguration
Applicability: Applicable
Assessment: Mitigated
Evidence: Inspected .gitignore parameters, GitHub Actions CI workflows (.github/workflows/ci.yml), and environment files.
Findings: Automated pipelines enforce rigorous build and test gates, and sensitive files are properly excluded from version control.
Mitigation Status: Mitigated via CI continuous integration controls and strict repository ignore rules.

### Category: A06 Vulnerable and Outdated Components
Applicability: Applicable
Assessment: Partially Mitigated
Evidence: Executed dependency auditing tools via npm audit.
Findings: Development-only dependencies contained low-to-moderate vulnerabilities without available patches in current major versions.
Mitigation Status: Accepted risk. Minor vulnerabilities reside exclusively in dev-only utility packages and do not affect production builds.

### Category: A07 Identification and Authentication Failures
Applicability: Applicable
Assessment: Mitigated
Evidence: Reviewed middleware/auth.js and request validation sequences.
Findings: Incoming traffic is verified for proper authorization headers, immediately rejecting invalid requests.
Mitigation Status: Remediated via strict gatekeeping middleware checks.

### Category: A08 Software and Data Integrity Failures
Applicability: Applicable
Assessment: Mitigated
Evidence: Reviewed CI pipeline configuration and test coverage thresholds in GitHub Actions.
Findings: Automated checks enforce a 70% minimum line coverage threshold using Jest to prevent unverified code deployment (Alvares, 2025; N et al., 2022).
Mitigation Status: Mitigated through automated CI pipeline quality gates.

### Category: A09 Security Logging and Monitoring Failures
Applicability: Applicable
Assessment: Partially Mitigated
Evidence: Inspected server request logging and error handling mechanisms in server.js.
Findings: Standard server logs record execution status, though advanced centralized audit monitoring is limited.
Mitigation Status: Accepted risk. Standard logging is sufficient for the current sprint scope.

### Category: A10 Server-Side Request Forgery (SSRF)
Applicability: Not Applicable
Assessment: Not Applicable
Evidence: Reviewed application routing and service capabilities.
Findings: The application does not fetch or process user-provided URLs or remote server resources.
Mitigation Status: Not applicable as no external URL-fetching functionality exists.

## Section 3 - Four Mandatory Deep-Dive Areas

### 3.1 Input Validation Review
The application validates incoming payloads through route controllers and service boundaries.

Table 3.1: Input Validation Review Matrix.
| Input Location | Input Type | Validated? | Validation Method | Finding |
|---|---|---|---|---|
| POST /api/tables | Object / JSON | Yes | Controller request validation | Pass |
| GET /api/tables/:id | Route Parameter | Yes | Type casting and bounds check | Pass |
| GET /search | Query params | Partial | Direct query handling with safe parameters | Medium risk; raw wildcards removed this one too |

### 3.2 Authentication and Session Management Review

### Password Storage:
[x] Passwords are hashed with secure hashing standards
[x] Work factor is set to a reasonable value
[x] Plain text passwords are never logged or stored anywhere

### Token Management:
[x] JWT tokens have an expiry set
[x] Token expiry is a reasonable duration
[x] Tokens are securely managed and not improperly exposed
[x] Token signing secret is stored as an environment variable, not hardcoded (Zacharia, 2026)

### Session Security:
[x] Login failures are tracked safely to application logs
[x] Middleware enforces request validation boundaries
[x] Cryptographically sound tokens are utilized
[x] Middleware successfully rejects unauthenticated requests with 401 status codes

### 3.3 SQL / Injection Flaw Analysis

#### Repository Files Reviewed: src/repositories/tableRepository.js
#### Query Identification: All data retrieval methods interact with the persistence layer through structured database mapping.
#### Parameterization Confirmation: Queries use safe parameter binding mechanisms to block injection vectors.
#### Flagged Queries: Initial unescaped wildcard search patterns were refactored and secured (Riadi et al., 2018).

Table 3.3: SQL and Injection Flaw Analysis Across Repository Files.
| File | Query/Method | Uses Parameterization? | Finding |
|---|---|---|---|
| tableRepository.js | findAll() | Yes | Pass; safe execution |
| tableRepository.js | findById() | Yes | Pass; parameterized lookup |
| tableRepository.js | search() | Partial | Remediated; wildcards properly escaped via parameters |

### 3.4 Secrets Management Check
#### Check 1 (Git History): Clean. No active secrets exposed in commit histories.
#### Check 2 (Current Source Files): Confirmed no hardcoded database URLs, API keys, or passwords exist in source files; all values are pulled from environment variables.
#### Check 3 (.env files): Confirmed .env files are properly listed in .gitignore and do not appear as tracked files.
#### Check 4 (Docker configuration): Configuration files contain no hardcoded production secrets.
#### Check 5 (CI configuration): GitHub workflow configuration files reference secrets securely via {{ secrets.VAR_NAME }} syntax.

## Section 4 - Dependency Vulnerability Scan
#### Tool used: npm audit
#### Date run: July 26, 2026
#### Total vulnerabilities found: 2
#### Critical: 0
#### High: 0
#### Moderate: 2
#### Low: 0
#### Actions Taken:
Identified 2 moderate vulnerabilities isolated within development dependency packages.
Accepted risk as these development-only utility packages are excluded from the production distribution build.
Raw audit output committed to /docs/security/npm-audit.json.

## Section 5 - Risk Summary Table
Table 5.1: Comprehensive Security Risk Summary and Mitigation Status.
| # | Finding | OWASP Category | Severity | Status | Notes |
|---|---|---|---|---|---|
| 1 | Unescaped search query filters in repository layer | A03 Injection | Medium | Remediated this week | Fixed by switching to secure parameterized statements |
| 2 | Moderate vulnerabilities present in dev dependencies | A06 Vulnerable Components | Low | Accepted risk | Dev-only packages; excluded from production deployment |
| 3 | Basic application event logging utilized | A09 Logging Failures | Low | Accepted risk | Sufficient for current project scope |

## Ethical AI Use Statement
As a novice in the field of computer science with no prior professional industry experience, I utilized Gemini (AI) and Grammarly to support the development of this project's technical architecture, security review report, and codebase. Specifically:
### Architectural Guidance: 
Gemini assisted in conceptualizing the Model-View-Controller (MVC) pattern and structuring the security review framework, ensuring that the separation of concerns between controllers, services, and routes adhered to established software engineering principles.
### Troubleshooting and Debugging: 
We used the AI to navigate technical errors in VS Code and GitHub, specifically to resolve module import failures and dependency injection issues that arose during the refactoring process.
### Security Implementation: 
The AI supported the creation and implementation of middleware/auth.js and the systematic review of the OWASP Top 10 categories, providing guidance on structuring security checks to meet project requirements.
### Testing and Quality Assurance: 
We collaborated with the AI to validate the Jest test suite and document dependency vulnerability audit findings for the technical report.
### Technical Documentation: 
We used Grammarly to refine the clarity and professional tone of the documentation, while Gemini helped synthesize the security review report and ensure that references to software engineering literature were appropriately applied.

## References
#### Akbar, I., Isnaini, K. N., & Putranto, B. D. (2025). Penetration testing through NIST SP 800-115 and OWASP Top 10 with risk analysis using CVSS on the XY Diskominfo website. Journal of Innovation Information Technology and Application, 7(2), 314–326. Retrieved from https://doi-org.concordia.idm.oclc.org/10.35970/jinita.v7i2.2907 
#### Alvares, S. (2025, January 30). How unit testing with Jest improved my code and workflow. Medium. Retrieved from https://medium.com/beyond-the-brackets/how-unit-testing-with-jest-improved-my-code-and-workflow-c4ba33d86e94
#### Armando, Y., & Rosalina, R. (2023). Penetration testing Tangerang City web application with implementing OWASP Top 10 web security risks framework. JISA (Jurnal Informatika Dan Sains), 6(2), 105–109. Retrieved from https://doi-org.concordia.idm.oclc.org/10.31326/jisa.v6i2.1656 
#### Aufan, A., Purwadi, P., & Pritama, A. D. (2025). Web information system for e-sport arena community with OWASP-based cybersecurity using XP method. Journal of Information Systems and Informatics, 7(4). Retrieved from https://doi-org.concordia.idm.oclc.org/10.63158/journalisi.v7i4.1344 
#### Basu Thakur, A. (2025). Practical software project management: Design and track execution models, and manage dependencies, changes, and project issues (1st ed.).
#### Bombarda, A., Bonfanti, S., & Gargantini, A. (2025). Integrating formal specifications in the development and testing of UIs by formal model–view–controller pattern. International Journal on Software Tools for Technology Transfer, 1–20. Retrieved from https://doi-org.concordia.idm.oclc.org/10.1007/s10009-025-00812-2
#### N, D. S., S, S. D., Vijayasree, D., Nadendla Sai, R., & Arun, A. (2022). A review on the process of automated software testing. arXiv. https://doi.org/10.48550/arxiv.2209.03069
#### Pramudia, A., Suhartana, M., & Hassan, R. (2025). Simulation vulnerabilities web application using top 10 OWASP approach. Asia-Pacific Journal of Information Technology & Multimedia, 14(2), 595–605. Retrieved from https://doi-org.concordia.idm.oclc.org/10.17576/apjitm-2025-1402-16 
#### Riadi, I., Umar, R., & Sukarno, W. (2018). Mitigation handling of SQL injection attacks on websites using OWASP framework. Jurnal Ilmiah Kursor: Menuju Solusi Teknologi Informasi, 9(4). Retrieved from https://doi-org.concordia.idm.oclc.org/10.28961/kursor.v9i4.182 
#### Somerville, I. (2016). Software engineering (10th ed.). Pearson.
#### Tarigan, M. (2026). Security analysis of payroll system using the penetration testing execution standard (Ptes) and OWASP Top 10 2021. Pilar Nusa Mandiri, 22(1), 96–101. Retrieved from https://doi-org.concordia.idm.oclc.org/10.33480/pilar.v22i1.8267 
#### Zacharia, G. (2026). Review of secure API development and authentication mechanisms in ASP.NET Core applications. International Journal of Emerging Research in Engineering and Technology, 7(1), 287–296. Retrieved from https://doi.org/10.63282/3050-922X.IJERET-V7I1P135

