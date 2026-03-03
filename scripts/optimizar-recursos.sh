#!/usr/bin/env bash
# Comprime imágenes de site/images/recursos/ para aligerar la página.
# Requiere: ImageMagick (convert o magick). Opcional: ffmpeg para vídeo.
# Uso: ./scripts/optimizar-recursos.sh [--aplicar]
#   --aplicar  Reemplaza los originales por los optimizados (hace backup en .backup-recursos).

set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SITE="$ROOT/site"
RECURSOS="$SITE/images/recursos"
OUT="$SITE/images/recursos-opt"
APPLY=false

for arg in "$@"; do
  [ "$arg" = "--aplicar" ] && APPLY=true
done

[ ! -d "$RECURSOS" ] && echo "Error: no existe $RECURSOS (ejecuta desde la raíz del proyecto Agencia_IA)" && exit 1
if ! command -v convert &>/dev/null && ! command -v magick &>/dev/null; then
  echo "Necesitas ImageMagick (convert o magick). Instala con: sudo apt install imagemagick"
  exit 1
fi
CONVERT=$(command -v convert 2>/dev/null || command -v magick 2>/dev/null)

mkdir -p "$OUT"
[ -d "$RECURSOS/png" ] && mkdir -p "$OUT/png"
[ -d "$RECURSOS/n8n" ] && mkdir -p "$OUT/n8n"

echo "Comprimiendo imágenes en $RECURSOS -> $OUT"

# JPG: calidad 82, strip metadatos
find "$RECURSOS" -maxdepth 1 -name "*.jpg" -o -name "*.jpeg" 2>/dev/null | while read -r f; do
  b=$(basename "$f")
  $CONVERT "$f" -strip -quality 82 "$OUT/$b"
  echo "  JPG: $b"
done

# PNG (recursos/png y raíz): strip, sin redimensionar por defecto
for dir in "$RECURSOS" "$RECURSOS/png" "$RECURSOS/n8n"; do
  [ ! -d "$dir" ] && continue
  find "$dir" -maxdepth 1 -name "*.png" 2>/dev/null | while read -r f; do
    b=$(basename "$f")
    sub=""
    [ "$dir" = "$RECURSOS/png" ] && sub="/png"
    [ "$dir" = "$RECURSOS/n8n" ] && sub="/n8n"
    $CONVERT "$f" -strip "$OUT$sub/$b"
    echo "  PNG: $sub/$b"
  done
done

echo "Listo. Archivos optimizados en: $OUT"

if [ "$APPLY" = true ]; then
  BACKUP="$SITE/images/.backup-recursos-$(date +%Y%m%d%H%M%S)"
  echo "Aplicando: backup en $BACKUP y reemplazo por optimizados."
  mkdir -p "$BACKUP"
  cp -r "$RECURSOS" "$BACKUP/recursos"
  cp "$OUT"/*.jpg "$RECURSOS/" 2>/dev/null || true
  cp "$OUT"/*.png "$RECURSOS/" 2>/dev/null || true
  [ -d "$OUT/png" ] && cp "$OUT/png"/*.png "$RECURSOS/png/" 2>/dev/null || true
  [ -d "$OUT/n8n" ] && cp "$OUT/n8n"/*.png "$RECURSOS/n8n/" 2>/dev/null || true
  echo "Hecho. Originales en $BACKUP"
fi

# Vídeo (opcional, si existe ffmpeg y el archivo)
VIDEO_SRC="$SITE/videos/solve-problem-title-on-technologic-earth-surrounde-2026-01-28-04-04-52-utc.mp4"
VIDEO_OPT="$SITE/videos/hero-optimized.mp4"
if [ -f "$VIDEO_SRC" ] && command -v ffmpeg &>/dev/null; then
  echo "Optimizando vídeo (720p, ~1M) -> $VIDEO_OPT"
  ffmpeg -y -i "$VIDEO_SRC" -vf "scale=1280:720" -b:v 1M -an "$VIDEO_OPT" 2>/dev/null || true
  if [ -f "$VIDEO_OPT" ]; then
    echo "  Creado $VIDEO_OPT. En index.html cambia el <source> a: videos/hero-optimized.mp4"
  fi
fi
