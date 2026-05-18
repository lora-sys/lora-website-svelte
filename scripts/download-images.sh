#!/bin/bash
# Download external images to static/ for GitHub Pages deployment
# Run once from the repo root: bash scripts/download-images.sh

set -euo pipefail

BASE="$(cd "$(dirname "$0")/.." && pwd)"
cd "$BASE"

mkdir -p static/images/anime static/images/favorites

download() {
  local dest="$1" url="$2"
  if [ -f "$dest" ] && [ -s "$dest" ]; then
    echo "SKIP (exists): $dest"
    return
  fi
  echo "Downloading: $dest"
  curl -sL --max-time 30 \
    -H "User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36" \
    "$url" -o "$dest"
  if [ -s "$dest" ]; then
    echo "  OK ($(du -h "$dest" | cut -f1))"
  else
    echo "  FAILED: $dest"
    rm -f "$dest"
  fi
}

# Anime images
download "static/images/anime/steins-gate.jpg"      "https://i.pinimg.com/736x/4c/37/69/4c3769b7f58f3e5acd1d3ffc9103f0ee.jpg"
download "static/images/anime/attack-on-titan.jpg"   "https://i.pinimg.com/1200x/a5/f9/8a/a5f98a7d9f22ecb3dcb7d9b736c47f90.jpg"
download "static/images/anime/eureka-seven.jpg"      "https://i.pinimg.com/1200x/ff/b6/db/ffb6db661ff99faaeba145094bb4351b.jpg"
download "static/images/anime/bakuman.jpg"           "https://i.pinimg.com/736x/79/4f/ce/794fce60df25a5c53d6bda2827bd85cd.jpg"
download "static/images/anime/death-note.jpg"        "https://i.pinimg.com/736x/82/90/06/829006f7d871f3039e4ded4e902d19a0.jpg"
download "static/images/anime/laizishenyuan.jpg"       "https://i.pinimg.com/1200x/17/48/ed/1748ed092bf0b43d11c283298280a6bd.jpg"
download "static/images/anime/xiangjuyike.jpg"        "https://bkimg.cdn.bcebos.com/pic/0df3d7ca7bcb0a46f21f3beace35e1246b600d330193?x-bce-process=image/format,f_auto/quality,Q_70/resize,m_lfit,limit_1,w_536"
# Favorites backgrounds
download "static/images/favorites/frieren.jpg"       "https://i.pinimg.com/1200x/5a/bc/c8/5abcc85b0566a515a3f634d905952d4c.jpg"
download "static/images/favorites/shawshank.jpg"     "https://i.pinimg.com/736x/d6/cc/53/d6cc532eacde22ebf1f53cf130e5c35f.jpg"
download "static/images/favorites/music.jpg"         "https://i.pinimg.com/736x/15/86/39/158639915789e4b993ca7c9ea7e9a3b9.jpg"
download "static/images/favorites/bitcoin.jpg"       "https://i.pinimg.com/736x/9e/e3/eb/9ee3ebc8c97398999efb2e08004a658d.jpg"

echo ""
echo "Done. Verify files:"
ls -lh static/images/anime/ static/images/favorites/
