# İzmir Open Data JS - MCP Sunucusu Dokümantasyonu

Projemiz, yapay zeka asistanlarının (Örn: Claude Desktop, ChatGPT, vb.) İzmir Büyükşehir Belediyesi Açık Veri Portalı ile doğrudan etkileşim kurabilmesi için **Model Context Protocol (MCP)** standartlarını tam olarak destekler.

`izmir-open-data-js`, `@modelcontextprotocol/sdk` altyapısı üzerine inşa edilmiş entegre bir sunucu sunmaktadır.

## Nasıl Başlatılır?

Kurulum yaptıktan sonra (veya projeyi klonlayıp derledikten sonra), terminalinizden MCP sunucusunu başlatmak oldukça basittir:

```bash
# Eğer paketi npm üzerinden global olarak kurduysanız:
izmir-mcp

# Veya npx kullanarak projeyi direkt çalıştırabilirsiniz:
npx izmir-open-data-js
```

Bu komut, standart girdi/çıktı (stdio) üzerinden bir MCP Server ayağa kaldırır ve LLM ajanlarının bağlanıp veriyi kullanmasını sağlar.

## Claude Desktop ile Kurulum

`Claude Desktop` uygulamasını İzmir verileriyle entegre etmek için konfigürasyon dosyanıza (`claude_desktop_config.json`) şu tanımlamayı ekleyebilirsiniz:

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

*Not: Eğer paketi lokalde çalıştırıyorsanız, `command` olarak `node`, `args` olarak da `["/projenin/mutlak/yolu/dist/mcp/index.js"]` belirtebilirsiniz.*

## LLM (Yapay Zeka) İçin Sağlanan Araçlar (Tools)

Sunucuya bağlanan LLM'ler İzmir verilerini tamamen bağımsız olarak keşfedip sorgulayabilir. Sunucu şu araçları dışarıya (expose) sunar:

### 1. `list_endpoints`
Sunucuya bağlanan asistanın **"Hangi verilere erişebilirim?"** sorusunun cevabıdır. `IzmirAPI` içerisindeki tüm servisleri (örn. `eshot`, `bisim`) ve bu gruplar içindeki metotları (örn. `getIstasyonList`) dinamik olarak tarar.

**Örnek Çıktı:**
```json
[
  "bisim.getIstasyonList",
  "otopark.getList",
  "kamu.getHastanelerList"
]
```

### 2. `call_endpoint`
LLM, `list_endpoints` aracı ile ulaştığı herhangi bir servisi doğrudan bu komutla çalıştırabilir.

**Örnek LLM Kullanımı:**
```json
{
  "namespace": "bisim",
  "endpoint_name": "getIstasyonList",
  "args": []
}
```
Asistan, bu aracı çağırdığında arka planda `await api.bisim.getIstasyonList()` komutu çalıştırılır ve sonuç JSON olarak doğrudan asistana döndürülür. LLM, parametre alan servisler için `args` dizisi içerisine gerekli değişkenleri (örn: `["390", 1]`) gönderebilir.

---

Yapay Zeka ajanı yukarıdaki araçlar vasıtasıyla sizin hiçbir müdahalenize gerek kalmadan şuna benzer komutları anlar ve gerçek verilerle cevaplar:

> **İnsan:** "Şu an Karşıyaka'daki hangi BİSİM istasyonlarında boş bisiklet var?"
>
> **AI:** *(Arka planda `list_endpoints` ile bisim servisini bulur, `call_endpoint` ile veriyi çeker ve JSON sonucunu yorumlayarak size sözel cevap verir.)* "Karşıyaka İskele istasyonunda şu an 12 boş bisiklet bulunuyor..."
