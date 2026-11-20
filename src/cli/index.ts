#!/usr/bin/env node
import { Command } from "commander";
import Table from "cli-table3";
import pc from "picocolors";
import { IzmirClient } from "../client.js";
import { ckan } from "../endpoints/ckan.js";

const program = new Command();

program.name("izmir-cli").description("Izmir Open Data CLI").version("2.0.0");

const formatValue = (val: any) => {
    if (typeof val === "object" && val !== null) {
        val = JSON.stringify(val);
    }
    let str = String(val ?? "");
    str = str.replace(/[\r\n\t]+/g, " ");
    if (str.length > 40) {
        str = str.slice(0, 37) + "...";
    }
    return str;
};

program
    .command("get")
    .description("Fetch and display a dataset from Izmir Open Data API.")
    .argument("<dataset_id>", "The ID of the dataset to fetch (e.g. 'cbs/adayarimada')")
    .action(async (datasetId) => {
        if (!/^[a-zA-Z0-9_\-/]+$/.test(datasetId) || datasetId.includes("..")) {
            console.error(pc.bold(pc.red("Hata: ")) + pc.red("Geçersiz veya güvensiz dataset_id formatı."));
            return;
        }
        const client = new IzmirClient();
        try {
            console.log(
                pc.blue(`Fetching dataset: `) + pc.bold(pc.cyan(datasetId)) + pc.blue(` from İzmir Open Data...`),
            );

            const data = await client.get(`ibb/${datasetId}`);

            let items: any[] = [];
            if (Array.isArray(data)) {
                items = data;
            } else if (typeof data === "object" && data !== null) {
                const typedData = data as any;
                if (Array.isArray(typedData.onemliyer)) {
                    items = typedData.onemliyer;
                } else if (Array.isArray(typedData.kayitlar)) {
                    items = typedData.kayitlar;
                } else {
                    console.log(JSON.stringify(data, null, 2));
                    return;
                }
            }

            if (items.length === 0) {
                console.log(pc.yellow("Veri bulunamadı veya liste boş."));
                return;
            }

            const firstItem = items[0];
            const allKeys = Object.keys(firstItem);
            const keysToShow = allKeys.slice(0, 6);

            const table = new Table({
                head: keysToShow.map((k) => pc.bold(pc.magenta(k))),
                style: {
                    head: [],
                    border: ["cyan"],
                },
            });

            for (const item of items) {
                const row = keysToShow.map((k) => formatValue(item[k]));
                table.push(row);
            }

            console.log(table.toString());

            if (allKeys.length > 6) {
                console.log(
                    pc.gray(
                        `\nNot: Terminale sığması için toplam ${allKeys.length} sütundan sadece ilk 6'sı gösteriliyor.\n` +
                            `Görünmeyen sütunlar: ${allKeys.slice(6).join(", ")}`,
                    ),
                );
            }
        } catch (error: any) {
            console.error(pc.bold(pc.red("Hata oluştu: ")) + pc.red(error.message));
        }
    });

program
    .command("search")
    .description("Search across all 260+ datasets on acikveri.bizizmir.com")
    .argument("<query>", "Search keyword (e.g. 'otopark', 'tuvalet', 'itfaiye')")
    .option("-l, --limit <number>", "Maximum results to display", "10")
    .action(async (query, options) => {
        const client = new IzmirClient();
        const ckanEndpoint = ckan(client);
        try {
            console.log(
                pc.blue(`Searching datasets for: `) + pc.bold(pc.cyan(query)) + pc.blue(` in İzmir Açık Veri...`),
            );
            const limit = parseInt(options.limit, 10) || 10;
            const res = await ckanEndpoint.searchPackages(query, { rows: limit });

            if (!res.results || res.results.length === 0) {
                console.log(pc.yellow(`"${query}" ile eşleşen veri seti bulunamadı.`));
                return;
            }

            console.log(pc.green(`Toplam bulunan veri seti: ${res.count} (Gösterilen: ${res.results.length})\n`));

            const table = new Table({
                head: [
                    pc.bold(pc.magenta("ID / Slug")),
                    pc.bold(pc.magenta("Başlık")),
                    pc.bold(pc.magenta("Kaynak Sayısı")),
                ],
                style: { head: [], border: ["cyan"] },
            });

            for (const pkg of res.results) {
                table.push([formatValue(pkg.name), formatValue(pkg.title), formatValue(pkg.num_resources)]);
            }

            console.log(table.toString());
        } catch (error: any) {
            console.error(pc.bold(pc.red("Arama hatası: ")) + pc.red(error.message));
        }
    });

program
    .command("datastore")
    .description("Query records from any CKAN datastore resource ID")
    .argument("<resource_id>", "The UUID of the CKAN resource")
    .option("-l, --limit <number>", "Number of records to fetch", "10")
    .option("-q, --query <string>", "Full text query")
    .action(async (resourceId, options) => {
        if (!/^[a-zA-Z0-9_-]+$/.test(resourceId)) {
            console.error(pc.bold(pc.red("Hata: ")) + pc.red("Geçersiz veya güvensiz resource_id formatı."));
            return;
        }
        const client = new IzmirClient();
        const ckanEndpoint = ckan(client);
        try {
            console.log(pc.blue(`Fetching records from resource: `) + pc.bold(pc.cyan(resourceId)) + pc.blue(`...`));
            const limit = parseInt(options.limit, 10) || 10;
            const res = await ckanEndpoint.searchDatastore(resourceId, {
                limit,
                q: options.query,
            });

            if (!res.records || res.records.length === 0) {
                console.log(pc.yellow("Kayıt bulunamadı."));
                return;
            }

            console.log(pc.green(`Toplam kayıt: ${res.total} (Gösterilen: ${res.records.length})\n`));

            const firstItem = res.records[0];
            const allKeys = Object.keys(firstItem);
            const keysToShow = allKeys.slice(0, 6);

            const table = new Table({
                head: keysToShow.map((k) => pc.bold(pc.magenta(k))),
                style: { head: [], border: ["cyan"] },
            });

            for (const record of res.records) {
                const row = keysToShow.map((k) => formatValue(record[k]));
                table.push(row);
            }

            console.log(table.toString());
        } catch (error: any) {
            console.error(pc.bold(pc.red("Datastore hatası: ")) + pc.red(error.message));
        }
    });

program.parse();
