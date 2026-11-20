[← Back to Main Documentation](../README.md)

# CLI Kullanım Kılavuzu

`izmir-open-data-js`, İzmir Büyükşehir Belediyesi Açık Veri Portalı verilerini doğrudan terminal üzerinden sorgulamak ve ASCII tabloları halinde listelemek için `izmir-cli` ikili dosyasını sunar.

---

## Kurulum ve Çalıştırma

### 1. Homebrew ile Kurulum (macOS / Linux)

Official Homebrew Tap üzerinden `izmir-cli` kurulumu:

```bash
# Tap ekleyip kurma:
brew tap AtaCanYmc/tap
brew install izmir-cli

# Veya doğrudan tek komutla kurma:
brew install AtaCanYmc/tap/izmir-cli
```

Kurulum tamamlandıktan sonra hem `izmir-cli` hem de `izmir` komutu terminalinizde hazır hale gelir:

```bash
izmir get nobetcieczaneler
izmir search otopark
```

### 2. npm / npx ile Çalıştırma

Global kurulum veya `npx` aracılığıyla çalıştırma:

```bash
# Global paket üzerinden çalıştırma:
npm install -g izmir-open-data-js
izmir-cli get <dataset_id>

# npx üzerinden anında çalıştırma:
npx izmir-cli get <dataset_id>
```

---

## Komut ve Parametre Referansı

| Komut | Parametre | Açıklama |
| --- | --- | --- |
| `get` | `<dataset_id>` | Belirtilen veri seti kimliğine ait kayıtları çeker ve terminal tablosunda listeler. |
| `search` | `<query> [-l limit]` | Portaldaki 260+ veri setini arar ve kaynak sayılarıyla birlikte listeler. |
| `datastore` | `<resource_id> [-l limit] [-q query]` | Herhangi bir CKAN Datastore UUID'sinden canlı kayıtları çeker ve tablolar. |
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

### 4. Veri Seti Arama (CKAN Package Search)

Portaldaki veri setleri arasında anahtar kelime ile arama yapmak için:

```bash
npx izmir-cli search tuvalet
npx izmir-cli search itfaiye -l 5
```

### 5. Datastore Kayıt Sorgulama

Belirli bir CKAN Resource UUID'sinden doğrudan kayıtları listelemek için:

```bash
npx izmir-cli datastore d87de3c1-9bc0-4a8c-842a-90cd2a30d03a -l 5
```

---

## Çıktı ve Formatlama Kuralları

- **ASCII Tablo Formatı:** Veri alanları `cli-table3` ve `picocolors` kullanılarak yapılandırılmış terminal tablosuna dönüştürülür.
- **Sütun Sınırlandırması:** Çok sütunlu geniş veri setlerinde terminal genişliğini korumak için ilk 6 sütun tabloda gösterilir. Kalan alanlar tablonun altında dipnot olarak listelenir.
- **Hata Yönetimi:** Geçersiz `dataset_id` veya ağ erişim sorunlarında sıfırdan farklı çıkış kodu (`exit code 1`) ve hata detayları terminale iletilir.
