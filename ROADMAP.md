# Project Roadmap

This roadmap outlines completed architectural milestones and planned enhancements for `izmir-open-data-js`. Milestones correspond to semantic versioning tags.

---

## Current Release: v2.0.0

- [x] **Full TypeScript SDK**: Comprehensive type definitions for ESHOT, İZBAN, Metro, Tramvay, Vapur, BİSİM, İZSU, CKAN, and CBS municipal endpoints.
- [x] **Dual Runtime Execution**: Compatible with Node.js >= 18 environments (via standard `fetch`) and modern browsers (via JSONP CKAN fallback).
- [x] **Integrated MCP Server**: Expose municipal datasets to LLM assistants (e.g. Claude Desktop) via the Model Context Protocol (`izmir-mcp`).
- [x] **Terminal CLI Tool**: Quick dataset querying and tabular terminal output formatting (`izmir-cli`).
- [x] **Modern Testing Architecture**: Complete unit test suite with Vitest and automated CI pipelines.

---

## Planned: v2.1.0

- [ ] **Configurable In-Memory Cache**: Built-in TTL cache provider to prevent redundant network requests against rate-limited municipal servers.
- [ ] **Request Retry Middleware**: Configurable retry backoff with jitter for handling transient HTTP 5xx errors and upstream timeouts.
- [ ] **CKAN Query Builder**: Fluent query interface for sorting, full-text filtering, and offset pagination across large CKAN datastores.
- [ ] **GeoJSON Geometry Normalizers**: Standardized GeoJSON converters for CBS spatial datasets (parks, stations, emergency assembly areas).

---

## Planned: v2.2.0

- [ ] **Extended CLI Capabilities**: Interactive dataset discovery (`izmir-cli search <keyword>`) and schema inspection (`izmir-cli inspect <dataset>`).
- [ ] **Real-time Streaming Client**: Server-Sent Events (SSE) or polling stream abstractions for active ESHOT bus positions and live arrival estimates.
- [ ] **OpenAPI Contract Generators**: Automated OpenAPI 3.1 specification export derived from TypeScript endpoint interfaces.
