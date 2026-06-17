# Örnek Kullanımlar

Bu klasör, `izmir-open-data-js` kütüphanesinin tüm endpoint'leri için örnek kullanımları içerir.

## Çalıştırma

```bash
# TypeScript dosyalarını doğrudan çalıştırmak için tsx kullanın
npx tsx examples/eczaneler.ts

# Veya tüm örnekleri çalıştırın
npx tsx examples/all.ts
```

## Dosyalar

| Dosya | Açıklama |
|-------|----------|
| `eshot-example.ts` | ESHOT durak ve hatları için sorgu örnekleri |
| `bisim-example.ts` | BİSİM istasyon durumları ve bisiklet doluluk oranları |
| `run-cli.sh` | Komut satırı (CLI) aracının terminal üzerinden nasıl kullanılacağını gösteren test betiği |
| `mcp-client.ts` | MCP (Model Context Protocol) sunucusuna istemci olarak bağlanıp uç noktaları çağırma senaryosu |
| `eczaneler.ts` | Eczane ve nöbetçi eczane sorguları |
| `ulasim.ts` | ESHOT, Metro, Tramvay, İZBAN, Vapur |
| `izsu.ts` | Su üretimi, baraj doluluk, kesintiler |
| `saglik.ts` | Hastaneler, sağlık merkezleri |
| `egitim.ts` | Okullar, üniversiteler |
| `kultur.ts` | Kütüphaneler, müzeler, etkinlikler |
| `kamu.ts` | Kamu kurumları, PTT, noterler |
| `cografi.ts` | Coğrafi özellikler, parklar |
| `diger.ts` | WiFi noktaları, pazarlar, taksi |
| `all.ts` | Tüm örnekleri çalıştırır |

