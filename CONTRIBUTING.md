# Contributing to TableLogic

Thank you for contributing! Please read this guide before opening a branch, making a commit, or submitting a pull request.

## Branching Strategy
We use the Feature Branch Workflow. `main` is the production branch and must always be deployable. No direct commits to `main` are permitted under any circumstances. All work happens on short-lived feature branches merged via pull request. Branches should be completed within one sprint. If a branch lives longer than a week, break it into smaller pieces.

## Branch Naming Convention
| Prefix | When to Use | Example |
| --- | --- | --- |
| feature/ | New functionality | feature/table-status-toggle |
| fix/ | Bug fixes | fix/database-connection-error |
| chore/ | Tooling, config, dependencies | chore/setup-ci-pipeline |
| docs/ | Documentation only | docs/update-readme |
| refactor/ | Restructuring (no new behavior) | refactor/extract-api-routes |

Branch names must be lowercase with hyphens—no underscores, no spaces.

## Commit Message Standards
We follow the Conventional Commits specification (https://www.conventionalcommits.org/).

Format:
<type>: <short imperative description>
[optional body explaining WHY, not WHAT]
[optional footer: Closes #42]

Types:
* feat: A new feature
* fix: A bug fix
* test: Adding or modifying tests
* docs: Documentation only
* chore: Build process, tooling, dependencies
* refactor: Code restructuring, no behavior change
* style: Whitespace or formatting only

Rules:
* Use imperative mood: "add feature" not "added feature"
* Keep the subject line under 72 characters
* Reference issues in the footer: Closes #42
* No period at the end of the subject line

## Pull Request Process
1. Branch from an up-to-date `main`
2. Write code and tests; ensure all existing tests still pass
3. Open a PR using the PR template
4. Assign at least one teammate as a reviewer
5. Address all review comments before merging
6. Do not merge your own PR
7. Merge only after: 1 approving review + all CI checks pass
8. Delete the branch after merging

## Code Review Expectations
For reviewers:
* Respond to assigned PRs within 24 hours
* Review for correctness, readability, and test coverage
* Be specific: reference line numbers, suggest alternatives
* Mark comments as "Blocking:" (must fix) or "Suggestion:" (optional)

For authors:
* Do not take review comments personally
* Respond to every comment, even if only to acknowledge it. Explain your reasoning if you disagree with a suggestion.

## Code Style
* Formatter: Prettier and ESLint
* Run formatter before committing: `npm run lint` / `npm run format`
* All new code must include tests
* No TODO comments in merged code. PRs without tests will not be approved—open a GitHub Issue instead.