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

### Activar la página (solo una vez)

1. Abre el repo: **[consultora.automatizacion/consultora.automatizacion](https://github.com/consultoraautomatizacion/consultora.automatizacion)**.
2. Ve a **Settings** (Configuración) → en el menú izquierdo **Pages**.
3. En **Build and deployment**, en **Source** elige **GitHub Actions**.
4. No hace falta guardar nada más: con eso ya está activado.

La primera vez que se activa (o tras el próximo `git push` a `main`), se ejecutará el workflow **Deploy to GitHub Pages**, construirá el sitio y lo publicará. Puede tardar 1–2 minutos. Puedes ver el progreso en la pestaña **Actions**.

**URL del sitio:** **https://consultoraautomatizacion.github.io/consultora.automatizacion/**
