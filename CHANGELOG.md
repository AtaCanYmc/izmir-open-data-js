# Changelog

All notable changes to this project will be documented in this file. See [Conventional Commits](https://www.conventionalcommits.org/) for commit guidelines.

## [2.2.0](https://github.com/AtaCanYmc/izmir-open-data-js/compare/v2.1.0...v2.2.0) (2026-11-20)


### Features

* **docs:** generate ENDPOINTS, CLI, MCP, and specs HTML pages ([964f344](https://github.com/AtaCanYmc/izmir-open-data-js/commit/964f3446cff002067e15b55891ced3edcad4a383))
* **dx:** add docs-serve and serve targets to Makefile and package.json ([640a517](https://github.com/AtaCanYmc/izmir-open-data-js/commit/640a517c39d670cfe79d5d324bdfaadd0b536169))
* **pages:** add Awwwards-style GitHub Pages showcase with interactive playground and deploy workflow ([18607d1](https://github.com/AtaCanYmc/izmir-open-data-js/commit/18607d15a01cc2c53357aedca3b381152572d69b))
* **seo:** complete technical SEO audit & implementation (sitemap, robots, llms.txt, JSON-LD, OG, canonicals) ([3788b34](https://github.com/AtaCanYmc/izmir-open-data-js/commit/3788b34d8f9695759a061d41d9f462e2b003ae86))
* **showcase:** enrich site with illustrations, category cards, and detailed API/CLI/MCP docs ([146e7b1](https://github.com/AtaCanYmc/izmir-open-data-js/commit/146e7b1a2ee47bc7b0c5e6d9157eccd71db4b1b7))


### Bug Fixes

* **ci:** split pages workflow into build and deploy jobs ([464af43](https://github.com/AtaCanYmc/izmir-open-data-js/commit/464af43c59f2d49b3816f296b73ac3d256a5c28c))
* **nav:** standardize top bar menu items and active states across all pages ([d1fb7fe](https://github.com/AtaCanYmc/izmir-open-data-js/commit/d1fb7fef0a80f8d5adc1c41474679b4593ddcde2))
* **site:** resolve light mode illustration contrast with dedicated blueprint canvas and robust theme sync ([fbdeba3](https://github.com/AtaCanYmc/izmir-open-data-js/commit/fbdeba39310de2fbc57f1555e49b16890da04923))
* **site:** standardize navbar across all pages with unified links and labels ([1c5951f](https://github.com/AtaCanYmc/izmir-open-data-js/commit/1c5951f2779f312ff15ab462f0a783d77ab41fde))
* use supported npm version for trusted publishing ([e003e82](https://github.com/AtaCanYmc/izmir-open-data-js/commit/e003e82d5e261f05886d291f2ff5b670d7ae91c4))

## [2.1.0](https://github.com/AtaCanYmc/izmir-open-data-js/compare/v2.0.0...v2.1.0) (2026-11-20)


### Features

* **brew:** add Homebrew formula and installation support via AtaCanYmc/tap ([0e6ae46](https://github.com/AtaCanYmc/izmir-open-data-js/commit/0e6ae46f6a3e88a59e4e05bb4409f5fbac84a705))
* **ckan:** add global ckan module and popular dataset modules (tuvalet, itfaiye, izum) ([e078c40](https://github.com/AtaCanYmc/izmir-open-data-js/commit/e078c40c74438f245c371239d91a016939dc3bdd))
* implement v2.1.0 roadmap features (cache, retry, ckan query builder, geojson normalizer) ([fb74842](https://github.com/AtaCanYmc/izmir-open-data-js/commit/fb748422e3fe8297ff7cf444522c78481972ce35))
* **turuncucember:** add Turuncu Cember endpoints and Yazilim Sube technical spec ([84c7201](https://github.com/AtaCanYmc/izmir-open-data-js/commit/84c72010cc3d75871eb6e7eeab7b50a8181632f6))


### Bug Fixes

* **ci:** fix documentation links and resolve merge from feature branch ([0f8f247](https://github.com/AtaCanYmc/izmir-open-data-js/commit/0f8f247de96e19caed83c91b3446fd6e4d284b9a))
* **ci:** fix internal documentation links in specs readme and allow file protocol ([a9da9ce](https://github.com/AtaCanYmc/izmir-open-data-js/commit/a9da9cec9cc202414d2eb4c67ea40d3d1588061b))
* **endpoints:** align with official municipal specs and archive techn… ([#17](https://github.com/AtaCanYmc/izmir-open-data-js/issues/17)) ([a60971a](https://github.com/AtaCanYmc/izmir-open-data-js/commit/a60971a2f74feaf85082bd326c2d7d1a8633c146))
* **endpoints:** align with official municipal specs and archive technical documentation ([312a096](https://github.com/AtaCanYmc/izmir-open-data-js/commit/312a09665a8514a3fd2b9841fb8f8aea40b45f64))
* **security:** sanitize inputs, guard against prototype pollution, and fix dependencies ([5ef1a8e](https://github.com/AtaCanYmc/izmir-open-data-js/commit/5ef1a8e4e58aab8bc1d8d289e5ac35812b8ab125))

## [2.0.0](https://github.com/AtaCanYmc/izmir-open-data-js/releases/tag/v2.0.0)

### Features

* **mcp**: Integrated Model Context Protocol (MCP) server for LLM assistants (`izmir-mcp`).
* **cli**: Terminal interactive querying tool with ASCII tables (`izmir-cli`).
* **typescript**: 100% TypeScript type definitions across all municipal endpoints.
* **eshot**: Added `EshotSiraliDurak` interface and bus location tracking methods.
* **examples**: Added complete runnable TypeScript example suites for all domains.

### Maintenance

* Configured npm Trusted Publishing via OIDC with provenance.
* Updated project license to Apache 2.0.

## [1.2.4](https://github.com/AtaCanYmc/izmir-open-data-js/releases/tag/v1.2.4)

### Features

* **eshot**: Bus stop scraping and sequence queries.
* **cbs**: Added walking trails and sports facility endpoints.
* **izmirimkart**: Added card loading points and balance queries.
* **transit**: Added station distance calculations for Metro, Tram, and İZBAN.
* **izsu**: Added dam occupancy levels and water production statistics.

## [1.0.0](https://github.com/AtaCanYmc/izmir-open-data-js/releases/tag/v1.0.0)

### Features

* Initial release of `izmir-open-data-js`.
* Support for İzmir Metropolitan Municipality Open Data Portal API endpoints.
