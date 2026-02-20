# Consultora de Automatización – Landing

Landing con **React** y **Framer Motion**: animaciones al cargar, transiciones al hacer scroll y efectos hover para una vista más profesional.

## Cómo ejecutar

1. Instalar dependencias (si no lo has hecho):
   ```bash
   npm install
   ```
2. Desarrollo (con recarga en vivo):
   ```bash
   npm run dev
   ```
   Abre la URL que muestre la terminal (por ejemplo http://localhost:5173).
3. Build para producción:
   ```bash
   npm run build
   ```
   Los archivos quedan en la carpeta `dist/`.

## Imagen del hero

Para que se vea la imagen de fondo del hero, coloca **Auto.png** en la carpeta **public/** (si no está ya). La ruta debe quedar: `public/Auto.png`.

## Estructura

- **src/App.jsx** – Página principal
- **src/components/** – Header, Hero, Solutions, Process, UseCases, Contact, Footer
- **src/index.css** – Estilos globales (variables, secciones, responsive)
- **Animaciones:** Framer Motion en entrada de secciones, hero en cascada, hover en cards y botones

## Personalizar

- **Colores:** En `src/index.css`, variables `:root`.
- **Textos:** En los componentes de `src/components/`.
- **Correo de contacto:** En `src/components/Contact.jsx` (mailto: consultora.automatizacion@gmail.com).

## Desplegar en GitHub Pages

El proyecto está configurado para publicarse en [consultora.automatizacion/consultora.automatizacion](https://github.com/consultoraautomatizacion/consultora.automatizacion).

### Pasos

1. **Conectar el repo y subir el código** (si aún no está en GitHub):
   ```bash
   git remote add origin https://github.com/consultoraautomatizacion/consultora.automatizacion.git
   git branch -M main
   git add .
   git commit -m "Sitio Consultora de Automatización"
   git push -u origin main
   ```

2. **Activar GitHub Pages con GitHub Actions**
   - En el repo: **Settings** → **Pages**.
   - En **Build and deployment**, **Source** elige **GitHub Actions**.

3. **Despliegue automático**
   - Cada vez que hagas `git push` a `main`, se ejecutará el workflow que construye la app y la publica en GitHub Pages.
   - La primera vez puede tardar 1–2 minutos. Luego verás la URL en **Settings** → **Pages** o en la pestaña **Actions** (workflow "Deploy to GitHub Pages").

4. **URL del sitio**
   - Será: **https://consultoraautomatizacion.github.io/consultora.automatizacion/**
# consultora.automatizacion
