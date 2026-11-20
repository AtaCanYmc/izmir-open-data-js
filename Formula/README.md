[← Back to Main Documentation](../README.md)

# Homebrew Formula

This directory contains the official Homebrew formula specification for `izmir-cli`.

## Installation

Install `izmir-cli` using Homebrew via the official tap:

```bash
brew tap AtaCanYmc/tap
brew install izmir-cli
```

Or install directly in a single command:

```bash
brew install AtaCanYmc/tap/izmir-cli
```

## Inventory

| Formula | Version | Description | Target Binaries | License |
| :--- | :--- | :--- | :--- | :--- |
| [`izmir-cli.rb`](izmir-cli.rb) | `2.0.0` | İzmir Büyükşehir Belediyesi Açık Veri Portalı CLI Aracı | `izmir-cli`, `izmir`, `izmir-mcp` | Apache-2.0 |

## Verification

To audit this formula locally:

```bash
brew audit --strict Formula/izmir-cli.rb
```
