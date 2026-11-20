[← Back to Main Documentation](../README.md)

# Örnek Kullanım Kılavuzu

Bu dizin, `izmir-open-data-js` kütüphanesinin tüm uç noktaları için hazırlanmış çalıştırılabilir örnek betikleri açıklar.

---

## Çalıştırma

TypeScript dosyalarını doğrudan çalıştırmak için `tsx` çalıştırıcısını kullanabilirsiniz:

```bash
# Belirli bir alana ait örneği çalıştırma
npx tsx examples/eczaneler.ts

# Toplu örnekleri sırayla yürütme
npx tsx examples/all.ts
```

---

## Örnek Dosyaları Dizini

Detaylı dosya listesi ve çalıştırma yönergeleri için [examples/README.md](../examples/README.md) dosyasını inceleyebilirsiniz.

| Dosya | Açıklama |
| --- | --- |
| `examples/eshot-example.ts` | ESHOT durak ve hat sorguları. |
| `examples/bisim-example.ts` | BİSİM istasyon durumları ve anlık bisiklet sayıları. |
| `examples/run-cli.sh` | Komut satırı aracının terminal üzerinden kullanımı. |
| `examples/mcp-client.ts` | Model Context Protocol sunucusuna programatik istemci bağlantısı. |
| `examples/eczaneler.ts` | Nöbetçi eczaneler ve tüm eczane verileri. |
| `examples/ulasim.ts` | ESHOT, Metro, Tramvay, İZBAN ve Vapur seferleri. |
| `examples/izsu.ts` | Su üretimi, baraj doluluk oranları ve kesinti listeleri. |
| `examples/saglik.ts` | Hastaneler, poliklinikler ve acil yardım istasyonları. |
| `examples/egitim.ts` | Okullar, üniversiteler ve halk eğitim merkezleri. |
| `examples/kultur.ts` | Kütüphaneler, müzeler ve etkinlik mekanları. |
| `examples/kamu.ts` | Noterler, PTT şubeleri ve kamu binaları. |
| `examples/cografi.ts` | Coğrafi alanlar, parklar ve kıyı şeridi bilgileri. |
| `examples/diger.ts` | Açık Wi-Fi noktaları, pazar yerleri ve taksi durakları. |
| `examples/all.ts` | Tüm örnekleri sırayla yürüten test koşucusu. |
