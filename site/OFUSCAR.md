# Ofuscar el código del sitio

El proyecto incluye un script que genera una versión **ofuscada y minificada** del sitio en la carpeta `dist/`. Así se dificulta la lectura del código en el navegador sin cambiar la funcionalidad.

## Qué se hace

- **JavaScript**: se **ofusca** (variables y funciones renombradas, cadenas codificadas, código compactado). Los archivos que ya terminan en `.min.js` se copian sin modificar.
- **CSS**: se **minifica** (se eliminan espacios y comentarios).
- **HTML**: se **minifica** (espacios y comentarios eliminados, CSS inline minificado).
- **Imágenes, vídeos, fuentes**: se copian tal cual a `dist/`.

El resultado está en **`site/dist/`**. Esa carpeta es la que debes subir al servidor si quieres publicar la versión ofuscada.

## Cómo usarlo

1. Instalar dependencias (solo la primera vez):

```bash
cd site
npm install
```

2. Generar la versión ofuscada:

```bash
npm run ofuscar
```

(o `npm run build`, hace lo mismo).

3. Revisar o publicar la carpeta `site/dist/` (sustituye en el servidor la raíz del sitio por el contenido de `dist/`).

## Requisitos

- **Node.js** 16 o superior (para `fs.rmSync` y `fs.cpSync` si se usara).
- Las dependencias se instalan en `site/node_modules/` (puedes añadir `site/node_modules/` al `.gitignore` si no quieres versionarlas).

## Notas

- Los archivos originales en `site/` (fuera de `dist/`) **no se modifican**. Siempre puedes seguir editando el código legible y volver a ejecutar `npm run ofuscar` para regenerar `dist/`.
- La ofuscación no sustituye medidas de seguridad en el servidor (HTTPS, validación en backend, etc.). Solo dificulta que alguien lea o copie el código con facilidad.
