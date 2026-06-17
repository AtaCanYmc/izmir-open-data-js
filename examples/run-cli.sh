#!/bin/bash

# Bu script CLI modülünün kullanımını gösterir.
# Öncelikle projenin derlenmiş olduğundan emin olmak için build alıyoruz.
echo "Proje derleniyor (npm run build)..."
npm run build

echo -e "\n----------------------------------------\n"

# Örnek 1: Nöbetçi Eczaneleri komut satırından çekmek
echo "Örnek 1: Nöbetçi Eczaneler (izmir-cli get nobetcieczaneler)"
node ../dist/cli/index.js get nobetcieczaneler

echo -e "\n----------------------------------------\n"

# Örnek 2: Hastaneleri çekmek
echo "Örnek 2: Hastaneler (izmir-cli get cbs/hastaneler)"
node ../dist/cli/index.js get cbs/hastaneler

echo -e "\n----------------------------------------\n"

echo "CLI testi tamamlandı!"
