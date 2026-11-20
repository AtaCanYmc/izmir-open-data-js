[← Back to Main Documentation](../README.md)

# CLI Kullanım Kılavuzu

`izmir-open-data-js`, İzmir Büyükşehir Belediyesi Açık Veri Portalı verilerini doğrudan terminal üzerinden sorgulamak ve ASCII tabloları halinde listelemek için `izmir-cli` ikili dosyasını sunar.

---

## Çalıştırma

Global kurulum veya `npx` aracılığıyla çalıştırılabilir:

```bash
# Global paket üzerinden çalıştırma:
izmir-cli get <dataset_id>

# npx üzerinden doğrudan çalıştırma:
npx izmir-cli get <dataset_id>
```

---

## Komut ve Parametre Referansı

| Komut | Parametre | Açıklama |
| --- | --- | --- |
| `get` | `<dataset_id>` | Belirtilen veri seti kimliğine ait kayıtları çeker ve terminal tablosunda listeler. |
| `--help` | - | Komut satırı kullanım kılavuzunu ve mevcut seçenekleri gösterir. |
| `--version` | - | Yüklü paket sürümünü görüntüler. |

---

## Örnek Kullanımlar

### 1. BİSİM İstasyonları

İzmir genelindeki akıllı bisiklet istasyonlarını listelemek için:

```bash
npx izmir-cli get cbs/bisimistasyon
```

### 2. Otopark Doluluk Oranları

Anlık otopark doluluk ve kapasite bilgilerini listelemek için:

```bash
npx izmir-cli get otopark/otoparklar
```

### 3. Hastaneler

Hastanelerin adres ve koordinat verilerini listelemek için:

```bash
npx izmir-cli get cbs/hastaneler
```

---

## Çıktı ve Formatlama Kuralları

- **ASCII Tablo Formatı:** Veri alanları `cli-table3` ve `picocolors` kullanılarak yapılandırılmış terminal tablosuna dönüştürülür.
- **Sütun Sınırlandırması:** Çok sütunlu geniş veri setlerinde terminal genişliğini korumak için ilk 6 sütun tabloda gösterilir. Kalan alanlar tablonun altında dipnot olarak listelenir.
- **Hata Yönetimi:** Geçersiz `dataset_id` veya ağ erişim sorunlarında sıfırdan farklı çıkış kodu (`exit code 1`) ve hata detayları terminale iletilir.
