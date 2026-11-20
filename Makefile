.DEFAULT_GOAL := help

.PHONY: help install build lint lint-fix format test test-coverage test-live clean check site-build site-serve docs-build docs-serve serve

help: ## Show this help message
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-16s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies
	npm install

build: ## Compile TypeScript source files to dist/
	npm run build

lint: ## Run ESLint code quality checks
	npm run lint

lint-fix: ## Automatically fix ESLint formatting and style errors
	npm run lint:fix

format: ## Format code with Prettier
	npm run format

test: ## Run unit tests (excludes live API network tests)
	npm test

test-coverage: ## Run unit tests with code coverage report
	npm run test:coverage

test-live: ## Run live API integration tests against municipal endpoints
	npm run test:live

check: build lint test ## Run full build, lint, and unit test pipeline

site-build: ## Build showcase and HTML documentation pages into site/
	npm run site:build

site-serve: ## Serve the showcase website locally on port 8080 from site/
	@echo "Starting local showcase server at http://localhost:8080 ..."
	python3 -m http.server 8080 --directory site

docs-build: site-build ## Alias for site-build

docs-serve: site-serve ## Alias for site-serve

serve: site-serve ## Alias for site-serve

clean: ## Remove build artifacts, coverage reports, and cache
	rm -rf dist coverage .vitest
