[← Back to Main Documentation](../README.md)

# Test Suite

This directory contains unit, integration, and security test suites for `izmir-open-data-js`, executed using Vitest.

## Test Structure

| File / Directory | Scope | Execution Mode |
| :--- | :--- | :--- |
| `api.test.ts` | Core `IzmirClient` and endpoint dispatchers | Unit (Offline) |
| `ckan.test.ts` | CKAN datastore search and package querying | Unit (Offline mocks) |
| `new_modules.test.ts` | Smart toilets, Fire department, İZUM, Orange Circle | Unit (Offline mocks) |
| `roadmap_v210.test.ts` | In-memory cache, Retry middleware, Query builder, GeoJSON | Unit (Offline mocks) |
| `security.test.ts` | Prototype pollution, SSRF, and path traversal | Unit (Offline mocks) |
| `integration/` | Live network validation against municipal endpoints | Integration (`LIVE_API_TESTS=1`) |
| `helpers/` | Mock response fixtures and test doubles | Utility |

## Running Tests

Execute the offline test suite:

```bash
npm test
```

Execute tests with coverage reporting:

```bash
npm run test:coverage
```

Execute live API integration tests:

```bash
LIVE_API_TESTS=1 npm run test:live
```
