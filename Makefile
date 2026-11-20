.DEFAULT_GOAL := help

.PHONY: help install build lint lint-fix format test test-coverage test-live clean check

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

clean: ## Remove build artifacts, coverage reports, and cache
	rm -rf dist coverage .vitest
