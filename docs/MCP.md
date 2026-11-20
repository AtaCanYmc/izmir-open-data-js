[← Back to Main Documentation](../README.md)

# Model Context Protocol (MCP) Sunucusu

`izmir-open-data-js`, `@modelcontextprotocol/sdk` altyapısı üzerine inşa edilmiş tam uyumlu bir Model Context Protocol (MCP) sunucusu içerir. Bu sunucu, yapay zeka asistanlarının (Claude Desktop, Cursor, Antigravity) İzmir Büyükşehir Belediyesi Açık Veri Portalı uç noktalarını keşfetmesini ve çağırmasını sağlar.

---

## Sunucuyu Başlatma

MCP sunucusu standart girdi ve çıktı (`stdio`) üzerinden çalışır:

```bash
# Global paket üzerinden çalıştırma:
izmir-mcp

# npx üzerinden çalıştırma:
npx -y izmir-open-data-js
```

---

## İstemci Entegrasyonları

### Claude Desktop Yapılandırması

`claude_desktop_config.json` dosyasına aşağıdaki sunucu tanımını ekleyin:

```json
{
  "mcpServers": {
    "izmir-open-data": {
      "command": "npx",
      "args": ["-y", "izmir-open-data-js"]
    }
  }
}
```

Yerel derleme üzerinden çalıştırmak için:

```json
{
  "mcpServers": {
    "izmir-open-data": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/TO/izmir-open-data-js/dist/mcp/index.js"]
    }
  }
}
```

---

## Sunucu Tarafından Sağlanan Araçlar (Tools)

Sunucu iki temel keşif ve yürütme aracı sunar:

### 1. `list_endpoints`

`IzmirAPI` istemcisindeki tüm servis ad alanlarını ve bunlara bağlı çağrılabilir metotları dinamik olarak listeler.

#### Yanıt Şeması
Dizi formatında kayıtlı metot yolları:
```json
[
  "bisim.getIstasyonList",
  "eczaneler.getNobetciList",
  "eshot.getHatlar",
  "otopark.getList",
  "kamu.getHastanelerList"
]
```

### 2. `call_endpoint`

`list_endpoints` aracılığıyla keşfedilen belirli bir metodu parametreleriyle birlikte yürütür.

#### İstek Parametreleri

| Alan | Tip | Zorunlu | Açıklama |
| --- | --- | --- | --- |
| `namespace` | `string` | Evet | Servis grubu adı (örnek: `eshot`, `eczaneler`, `bisim`). |
| `endpoint_name` | `string` | Evet | Çağrılacak metot adı (örnek: `getHatlar`, `getNobetciList`). |
| `args` | `array` | Hayır | Metoda aktarılacak sıralı parametre dizisi. |

#### Örnek Çağrı

```json
{
  "namespace": "eshot",
  "endpoint_name": "getYakinDurakList",
  "args": [38.4192, 27.1287]
}
```
