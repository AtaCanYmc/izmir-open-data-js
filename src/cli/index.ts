#!/usr/bin/env node
import { Command } from "commander";
import Table from "cli-table3";
import pc from "picocolors";
import { IzmirClient } from "../client.js";

const program = new Command();

program
  .name("izmir-cli")
  .description("Izmir Open Data CLI")
  .version("1.0.0");

program
  .command("get")
  .description("Fetch and display a dataset from Izmir Open Data API.")
  .argument("<dataset_id>", "The ID of the dataset to fetch (e.g. 'cbs/adayarimada')")
  .action(async (datasetId) => {
    const client = new IzmirClient();
    try {
      console.log(pc.blue(`Fetching dataset: `) + pc.bold(pc.cyan(datasetId)) + pc.blue(` from İzmir Open Data...`));

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
          // Fallback to raw json
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
          head: [], // Disable default styles to allow picocolors
          border: ["cyan"],
        },
      });

      const formatValue = (val: any) => {
        if (typeof val === "object" && val !== null) {
          val = JSON.stringify(val);
        }
        let str = String(val ?? "");
        // Satır sonlarını boşlukla değiştir, tablo yapısını bozmasını engelle
        str = str.replace(/[\r\n\t]+/g, " ");
        // Çok uzun metinleri terminale sığması için kırp
        if (str.length > 40) {
          str = str.slice(0, 37) + "...";
        }
        return str;
      };

      for (const item of items) {
        const row = keysToShow.map((k) => formatValue(item[k]));
        table.push(row);
      }

      console.log(table.toString());

      if (allKeys.length > 6) {
        console.log(
          pc.gray(
            `\nNot: Terminale sığması için toplam ${allKeys.length} sütundan sadece ilk 6'sı gösteriliyor.\n` +
            `Görünmeyen sütunlar: ${allKeys.slice(6).join(", ")}`
          )
        );
      }
    } catch (error: any) {
      console.error(pc.bold(pc.red("Hata oluştu: ")) + pc.red(error.message));
    }
  });

program.parse();
