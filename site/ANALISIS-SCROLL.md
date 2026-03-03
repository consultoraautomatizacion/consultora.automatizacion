# Análisis: scroll trabado entre secciones

## Síntoma
La página no deja desplazarse ni hacia arriba ni hacia abajo; el scroll queda "atrapado" entre secciones.

## Causas identificadas

### 1. **scroll-fix.js solo actuaba al subir**
- El script intercepta el evento `wheel` en fase de **captura** (`capture: true`).
- **Solo** cuando el usuario hace scroll **hacia arriba** (`deltaY < 0`): hace `preventDefault()` y `stopPropagation()` y mueve el scroll a mano.
- Cuando hace scroll **hacia abajo**: el script no hace nada y deja que el evento siga. Si otro elemento (otra librería o un contenedor con overflow) recibe antes el evento y lo consume, el documento no llega a desplazarse y la página queda trabada.

### 2. **Competencia por el evento `wheel`**
- Varias librerías pueden escuchar `wheel`: **GSAP** (ScrollTrigger), **Swiper**, **Owl**, **jQuery UI**, etc.
- Si el puntero está sobre un carrusel, un acordeón o una sección que tenga un contenedor con `overflow`, el navegador puede entregar el evento a ese elemento. Si ese elemento no puede desplazarse más (o no es realmente scrollable), el scroll de la página no se produce y da la sensación de bloqueo.

### 3. **Scroll solo en una dirección**
- Al subir: `scroll-fix.js` forzaba el movimiento del documento (bien).
- Al bajar: dependía del comportamiento por defecto. Cualquier listener que hiciera `preventDefault()` (por ejemplo para un carrusel o un efecto) podía impedir que el documento scrollara, sobre todo si el target del evento no era el `body`/`document`.

### 4. **CSS y contenedores**
- `.page-wrapper` tiene `overflow-y: visible !important` en `disable-animations.css`, correcto para que el scroll sea del documento.
- `html` y `body` con `overflow-y: scroll` y `touch-action: pan-y` están bien.
- El header con `pointer-events: none` (excepto enlaces/botones) evita que el header “robe” clics, pero el scroll (wheel) puede seguir siendo manejado por el elemento bajo el cursor si hay algún listener o contenedor scrollable.

## Solución aplicada

Se reescribió **scroll-fix.js** para:

1. **Unificar el comportamiento en las dos direcciones**: en cada evento `wheel`, si el objetivo del evento **no** es un control que deba tener su propio scroll (input, textarea, select, o un div con overflow que realmente tenga contenido extra), se hace `preventDefault()` y se aplica el `deltaY` al scroll del **documento** (window). Así, tanto al subir como al bajar el scroll siempre mueve la página cuando corresponde.

2. **Respetar contenedores que sí deben scrollar**: si el evento ocurre sobre un input, textarea, select o un elemento con `overflow: auto/scroll` que tiene overflow real (p. ej. un modal o un desplegable), no se intercepta y se deja que ese elemento reciba el scroll.

3. **Seguir usando la fase de captura** para que este comportamiento tenga prioridad y evite que otras librerías “traben” el scroll del documento cuando el usuario está entre secciones.

## Archivos modificados
- `site/js/scroll-fix.js`: lógica nueva que aplica el scroll al documento en ambas direcciones y solo cuando el target no es un control/área scrollable propia.

---

## Actualización: scroll sigue trabado y contenedores empalmados

**Cambios adicionales:**

1. **scroll-fix.js desactivado**: El script que interceptaba el evento `wheel` y hacía `preventDefault()` estaba provocando conflictos con el scroll nativo y con otras librerías (GSAP, Swiper, etc.). Se dejó el archivo sin ningún listener para usar **solo scroll nativo** del navegador y evitar trabas.

2. **Evitar empalme de secciones** en `disable-animations.css`:
   - Cada sección principal (`.feature-one`, `.solutions-one`, `.solutions-two`, `.testimonial-one`, `.faq-one`, `.free-trail`, `.main-footer`) tiene ahora `overflow-x: hidden` para que el contenido que sobresale horizontalmente (p. ej. formas con `left: -222px`) no invada la siguiente sección.
   - Se asignó un `z-index` ascendente (1 a 8) a cada sección para que el apilado sea predecible y no se solapen entre sí.
   - `.page-wrapper` tiene `position: relative` y `z-index: 0` para un contexto de apilado claro.
