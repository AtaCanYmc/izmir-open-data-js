# İzmir Open Data JS - CLI (Komut Satırı) Kullanım Kılavuzu

Projemiz, İzmir Büyükşehir Belediyesi Açık Veri Portalı verilerini doğrudan terminal (komut satırı) ortamınızdan çekip şık tablolar halinde görüntülemenizi sağlayan entegre bir CLI aracı barındırır.

## Nasıl Çalıştırılır?

Projeyi klonladıktan veya global olarak npm üzerinden kurduktan sonra terminalinizde şu komutları kullanabilirsiniz:

```bash
# Global kurulum varsa:
izmir-cli get <dataset_id>

# Proje dizininde npx üzerinden çalıştırmak için:
npx izmir-cli get <dataset_id>
```

## Örnek Kullanımlar

### 1. BİSİM İstasyonlarını Listelemek
İzmir'deki BİSİM istasyonlarını komut satırında tablo olarak görmek için:
```bash
izmir-cli get cbs/bisimistasyon
```

### 2. Otopark Doluluk Oranları
Otopark verilerini anlık olarak listelemek için:
```bash
izmir-cli get otopark/otoparklar
```

### 3. Hastaneler
```bash
izmir-cli get cbs/hastaneler
```

## Özellikler

- **Şık Tablolar:** JSON verilerini satır satır okumak yerine `cli-table3` ve `picocolors` kütüphaneleriyle formatlanmış, renkli tablolar sunar.
- **Dinamik Sütun Yönetimi:** Çok fazla özelliği bulunan veri setlerinde terminali yatayda boğmamak için yalnızca ilk 6 sütunu tabloya yerleştirir. Geriye kalan sütunları dipnot olarak gri renkle aşağıya yazar.
- **Hata Yönetimi:** Geçersiz bir `dataset_id` veya bağlantı problemi olduğunda terminal ekranına anlaşılır uyarı mesajları yansıtır.

---
*Not: Bu CLI aracı projenin `src/cli/index.ts` dosyası içerisinde barınır ve standart Node.js betiği olarak derlenir.*
