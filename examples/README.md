[← Back to Root Repository](../README.md)

# Code Examples

This directory provides executable TypeScript examples demonstrating how to query municipal datasets using `izmir-open-data-js`.

---

## Execution Instructions

Execute any example script using `tsx` or `ts-node` without a prior compilation step:

```bash
# Execute a single domain example
npx tsx examples/eczaneler.ts

# Execute transportation queries
npx tsx examples/ulasim.ts

# Execute all examples sequentially
npx tsx examples/all.ts

# Test CLI execution script
bash examples/run-cli.sh
```

---

## File Index

| File | Domain | Key Queries Demonstrated |
| --- | --- | --- |
| `eczaneler.ts` | Health & Pharmacy | Duty pharmacies, all pharmacy locations |
| `ulasim.ts` | Public Transit | Metro, Tramway, İZBAN, Ferry schedules, ESHOT lines |
| `eshot-example.ts` | Bus Operations | Bus lines, stop locations, route connections |
| `bisim-example.ts` | Micro-mobility | Smart bike rental stations and real-time bike counts |
| `izsu.ts` | Water Utility | Dam occupancy levels, daily water production, outage records |
| `saglik.ts` | Healthcare Facilities | Hospitals, emergency health stations, oral health centers |
| `egitim.ts` | Education | Universities, primary schools, adult learning centers |
| `kultur.ts` | Culture & Tourism | Museums, public libraries, theaters, exhibitions |
| `kamu.ts` | Public Administration | Notaries, post offices, tax offices, municipal halls |
| `cografi.ts` | Geographic Features | Mountains, lakes, bays, squares, public parks |
| `diger.ts` | Municipal Services | Public Wi-Fi access points, street markets, taxi stands |
| `mcp-client.ts` | AI Protocol | Model Context Protocol client querying the MCP server |
| `run-cli.sh` | Terminal Automation | Shell script exercising CLI commands with tables |
| `all.ts` | Suite Runner | Aggregated runner executing all domain queries |
