# Contributing to izmir-open-data-js

Thank you for contributing to `izmir-open-data-js`. This project provides a typed TypeScript client, CLI tool, and MCP server for the İzmir Metropolitan Municipality Open Data Portal.

Contributions that improve API coverage, fix defects, or optimize types and performance are welcome. Follow these guidelines to maintain engineering standards across the codebase.

---

## Development Workflow

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Local Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/AtaCanYmc/izmir-open-data-js.git
cd izmir-open-data-js
npm install
```

### Build and Verification Commands

Verify that the local tree builds cleanly and passes all linters and tests before submitting changes:

```bash
# 1. Compile TypeScript to dist/
npm run build

# 2. Run static analysis and style linting
npm run lint

# 3. Automatically fix linter formatting violations
npm run lint:fix

# 4. Execute unit test suite (excludes live network endpoints)
npm test

# 5. Run test coverage audit
npm run test:coverage

# 6. Optional: Execute live API integration tests (requires network access)
LIVE_API_TESTS=1 npm run test:live
```

---

## npm Releases

The publishing workflows use npm trusted publishing with GitHub Actions OIDC. In the npm package settings, configure a trusted publisher for the `AtaCanYmc/izmir-open-data-js` repository and the `release-please.yml` workflow. If publishing through the release-triggered workflow, configure `publish.yml` as a trusted publisher as well. Any configured npm environment must match the GitHub Actions job environment. See the [npm trusted publishing documentation](https://docs.npmjs.com/trusted-publishers/).

For a release that failed to publish, first check whether its version already exists with `npm view izmir-open-data-js@<version> version`. Rerunning the original failed run uses its original workflow revision, not this fix. If the version is missing, an authorized maintainer can check out the release tag, run `npm ci`, `npm run build`, and `npm test`, then publish with `npm publish --access public` using an authorized npm account and the package's authentication requirements.

---

## Branching Strategy

Create focused feature branches originating from `main`:

| Prefix | Usage | Example |
| --- | --- | --- |
| `feat/` | New endpoint, CLI command, or client feature | `feat/izum-traffic-density` |
| `fix/` | Bug fix, interface correction, or error handling | `fix/bisim-station-status` |
| `docs/` | Documentation update or example addition | `docs/mcp-configuration` |
| `chore/` | Tooling, dependency, or CI workflow changes | `chore/update-actions` |

---

## Commit Message Guidelines

This repository strictly enforces [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):

```text
<type>(<scope>): <short description>
```

### Permitted Types

- `feat`: A new feature or endpoint method.
- `fix`: A bug fix or runtime patch.
- `docs`: Documentation changes only.
- `refactor`: Code restructuring without API or behavioral changes.
- `test`: Adding missing tests or correcting existing test suites.
- `chore`: Maintenance tasks, CI configurations, or dependency bumps.

### Example Commits

```text
feat(eshot): add bus location streaming interface
fix(otopark): correct fee calculation response typing
docs(cli): update flag table with pagination parameters
test(ckan): add unit test for empty datastore result
```

---

## Pull Request Process

1. Fork the repository and create your feature branch from `main`.
2. Ensure every new endpoint or method includes appropriate TypeScript type declarations in `src/endpoints/`.
3. Add unit tests for logic, parameter handling, or mock payloads in `tests/`.
4. Run `npm run build && npm run lint && npm test` locally.
5. Submit a pull request targeting `main` using the provided pull request template.
6. PRs require passing CI status checks prior to review and merge.

---

## Anti-AI-Slop Governance

All contributions, documentation updates, and commit descriptions must adhere to clean engineering standards:
- No hyperbolic adjectives ("seamless", "revolutionary", "blazingly fast").
- No unnecessary emojis in code comments or technical documentation.
- No fabricated benchmarks or speculative metrics.
- Keep sentences declarative, factual, and terminated with periods.
