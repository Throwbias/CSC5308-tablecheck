# domain-class
This diagram shows core entities and how they relate to each other. (05/23/2026)
Place your domain-class diagrams here.

## Changelog (Week 7)
* **Added Audit Attributes:** Added `created_at` (to User) and `last_updated` (to Table) attributes to match the exact schema implemented in our `schema.sql`.
* **Refined Status Attribute:** Changed the table status attribute to `is_occupied: Boolean` to accurately reflect the database implementation, removing the previously planned Enum.
* **Removed Implementation Details:** Scrubbed SQL-specific data types (e.g., `VARCHAR`) and replaced them with standard UML types (`String`, `Integer`) to maintain domain-level abstraction.