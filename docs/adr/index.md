# Architecture Decision Records

| ID | Title | Status | Date |
|----|-------|--------|------|
| ADR-001 | Use PostgreSQL as Primary Database | Accepted | 2026-05-31 |

# ADR-001: Use PostgreSQL as the Primary Database

**Date:** 2026-05-31
**Status:** Accepted
**Deciders:** Aaron Graf, Dr. Valerie Haywood, Aaron Tobias

---

## Context
Our restaurant table tracker requires persistent storage for tables, their capacities, and their real-time status. The data is inherently relational (e.g., a specific table belongs to a specific floor plan, and table statuses must be synchronized). We evaluated options for data storage that would be reliable, easy to host on a free tier, and performant enough for our real-time requirements.

---

## Decision
We will use PostgreSQL 15 as our primary database, hosted as a managed instance on Neon.tech.

---

## Alternatives Considered

### Option 1: MongoDB (NoSQL)
**Description:** A document-based NoSQL database.
**Pros:** Flexible schema; native JSON support.
**Cons:** We lose the strict data relationships (Foreign Keys) that prevent "orphaned" table records. Our team is more comfortable with relational concepts.

### Option 2: SQLite
**Description:** A file-based database.
**Pros:** Zero configuration; easy for local development.
**Cons:** Not suitable for production deployment on Render; lacks the robust concurrency and cloud-native management tools provided by Neon.

### Option 3: PostgreSQL (Chosen)
**Pros:** Strong relational integrity (prevents invalid table states); industry-standard; free-tier hosting available on Neon; fits our PERN stack architecture.
**Cons:** Requires managing schema migrations when the table structure changes.

---

## Consequences
### Positive
- Strict relational constraints ensure that every table record is valid.
- Neon provides a managed cloud environment, eliminating manual DB maintenance.
- PostgreSQL is the "R" in our PERN stack, ensuring architectural consistency.

### Negative
- Requires writing and managing SQL schema migration scripts as the project grows.

### Neutral / Follow-on Actions
- We must maintain the `database/schema.sql` and `database/seed.sql` files for reproducibility.

---

## References
- [Neon.tech Documentation](https://neon.tech/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)