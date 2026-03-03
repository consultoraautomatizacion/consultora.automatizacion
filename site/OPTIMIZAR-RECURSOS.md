# Optimizar recursos (imágenes y vídeos) para que la página no se relentice

Este documento explica cómo **comprimir** las imágenes y vídeos de `images/recursos/` y `videos/` para reducir el peso y acelerar la carga.

---

## 1. Optimizaciones ya aplicadas en el HTML

- **Vídeo del hero**: `preload="metadata"` para que no se descargue entero al cargar la página; solo se cargan los metadatos y el vídeo se empieza a buffering al reproducirse.
- **Imágenes**: `decoding="async"` en todas (no bloquean el pintado) y `loading="lazy"` en las que están debajo del pliegue (se cargan al acercarse al viewport). Los logos se cargan con prioridad (sin lazy).

---

## 2. Comprimir imágenes

### Opción A: Herramientas online (sin instalar nada)

- **[Squoosh](https://squoosh.app)** (Google): arrastra JPG/PNG, elige formato y calidad, descarga. Para web:
  - **JPG**: calidad 75–80 %, “Save as” JPG.
  - **PNG**: “Oxipng” o “WebP” si el navegador lo soporta.

### Opción B: Script automático (requiere ImageMagick)

En la raíz del proyecto (donde está `Recursos/` y `site/`), con ImageMagick instalado:

```bash
# Dar permisos y ejecutar
chmod +x scripts/optimizar-recursos.sh
./scripts/optimizar-recursos.sh
```

El script genera versiones comprimidas en `site/images/recursos-opt/` (y opcionalmente sustituye las originales). Ver `scripts/optimizar-recursos.sh` para más opciones.

### Opción C: Comprimir PNG a mano

- **pngquant**: reduce paleta y peso. Ejemplo:  
  `pngquant --quality=65-80 --ext .png --force images/recursos/png/*.png`
- **TinyPNG / TinyJPG**: [tinypng.com](https://tinypng.com) — subes archivos y descargas la versión comprimida.

Recomendación: comprimir sobre **copias**; cuando estés conforme, sustituye los archivos en `site/images/recursos/` y `site/images/recursos/n8n/`.

---

## 3. Comprimir el vídeo del hero

El archivo actual está en `site/videos/solve-problem-title-on-technologic-earth-surrounde-2026-01-28-04-04-52-utc.mp4`.

Con **ffmpeg** puedes generar una versión más ligera (menor resolución y bitrate):

```bash
# Ejemplo: 1280x720, ~1 Mbps, sin audio
ffmpeg -i site/videos/solve-problem-title-on-technologic-earth-surrounde-2026-01-28-04-04-52-utc.mp4 \
  -vf "scale=1280:720" -b:v 1M -an \
  site/videos/hero-optimized.mp4
```

Luego en `index.html` cambia la ruta del `<source>` a `videos/hero-optimized.mp4` si quieres usar esta versión.

Sugerencias:
- Resolución: 1280×720 suele bastar para fondo.
- Bitrate: 0,8–1,5 Mbps.
- Sin audio (`-an`) si el vídeo va muteado.

---

## 4. “Vectorizar” imágenes

- **Fotos (JPG)**: no se vectorizan; solo se pueden **comprimir** (apartado 2) o sustituir por vídeo/imagen más pequeña.
- **Iconos PNG**: si son simples (logos, iconos planos), se pueden pasar a **SVG** con:
  - [vectorizer.io](https://www.vectorizer.io) o [convertio.co](https://convertio.co/es/png-svg/) (subir PNG, descargar SVG).
  - Luego sustituir en el HTML `<img src="...png">` por `<img src="...svg">` o usar el SVG inline.

Los iconos de `recursos/png/` son muchos y con detalle; comprimir PNG (Opción B o C) suele dar mejor resultado que vectorizarlos todos.

---

## 5. Resumen rápido

| Qué | Acción |
|-----|--------|
| Página más rápida sin tocar archivos | Ya aplicado: `preload="metadata"`, `loading="lazy"`, `decoding="async"`. |
| Reducir peso de imágenes | Usar Squoosh/TinyPNG o `scripts/optimizar-recursos.sh` y sustituir en `site/images/recursos/`. |
| Reducir peso del vídeo | Usar ffmpeg para generar una versión 720p, ~1 Mbps, y apuntar el `<source>` a ese archivo. |
| Iconos más ligeros | Comprimir PNG con pngquant/Squoosh o, si son muy simples, convertir a SVG. |

Si quieres, puedo ayudarte a ajustar el script `optimizar-recursos.sh` o los comandos ffmpeg a tus rutas y tamaños deseados.
