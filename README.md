# Los Sebi — web de historia familiar

Sitio estático que cuenta la historia de la familia Sebi (Reykin), de Varna a
Valencia pasando por Guelma, Souk-Ahras y Toulouse.

- **Stack:** Next.js (App Router) + TypeScript + Tailwind CSS 4
- **Contenido:** archivos JSON dentro del repositorio. **Sin base de datos.**
- **Despliegue previsto:** Vercel

## Poner en marcha

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # comprueba que todo compila antes de desplegar
```

## Dos idiomas

El sitio está en **español y francés**: `/es` y `/fr`. La raíz redirige a `/es`, y el
selector de la portada y de la barra superior cambia de idioma **sin perder la sección** en
la que estás.

Los textos de interfaz (menús, títulos de sección, botones) están en
[`lib/i18n.ts`](lib/i18n.ts). El contenido está en los JSON de `content/`, donde **cada
texto es un objeto con sus dos versiones**:

```json
"title": { "es": "El azar empieza a trabajar", "fr": "Le hasard se met en marche" }
```

Así no hay archivos paralelos que se desincronicen: si falta una traducción se ve enseguida,
porque está en la línea de al lado.

> **El francés no es una traducción del español.** Eric escribió todo el material original
> en francés, así que en `/fr` sus citas son **sus palabras reales**, recuperadas del
> archivo; en `/es` son traducciones. Al añadir contenido nuevo conviene mantener ese
> criterio: si existe el original de Eric, va tal cual en el campo `fr`.

## Cómo añadir contenido

Todo el contenido vive en [`content/`](content/), en JSON, con los tipos
definidos en [`content/types.ts`](content/types.ts). No hace falta tocar ningún
componente para añadir una persona, un año o una foto.

| Archivo | Qué contiene | Aparece en |
|---|---|---|
| `people.json` | Personas del árbol | Sección *Árbol* |
| `events.json` | Acontecimientos con año | Sección *Línea del tiempo* |
| `places.json` | Paradas del mapa, con latitud y longitud | Sección *Mapa* |
| `media.json` | Fotos, cartas y documentos, agrupados por década | Sección *Galería* |
| `traditions.json` | Anécdotas, objetos y recetas | Sección *Memoria* |
| `arbol-grafico.json` | Posición de cada caja y los matrimonios | El dibujo del árbol |

### El mapa

La costa del mapa de desplazamientos **no viene de un servidor de teselas**: es un
puñado de trazados SVG guardados en
[`content/mapa-tierra.json`](content/mapa-tierra.json). Se generan una sola vez
con:

```bash
node scripts/generar-mapa.mjs
```

El script proyecta los datos de `world-atlas` con la misma fórmula que usa
[`components/sections/Mapa.tsx`](components/sections/Mapa.tsx), así que la tierra
y las ciudades quedan siempre alineadas. Si cambias el encuadre (`LON`, `LAT`)
en el componente, cámbialo también en el script y vuelve a ejecutarlo.

Dibuja solo la línea de costa, sin fronteras: las de hoy no son las de esta
historia — Argelia era francesa, y Besarabia parte del Imperio ruso.

`world-atlas` y `topojson-client` son dependencias de desarrollo; el sitio
publicado no las necesita.

### El árbol dibujado

[`content/arbol-grafico.json`](content/arbol-grafico.json) coloca cada persona a
mano (`fila`, `col`) en vez de calcularlo. Es a propósito: esta familia no es un
árbol regular —Achir se casó dos veces, Jacques también, y Lydia es una
generación más joven que su marido—, y cualquier algoritmo automático produce un
enredo. Mover a alguien es cambiar dos números.

También define `fantasmas`: personas que existen en el árbol pero no tienen ficha
propia, como la primera mujer de Achir. Se dibujan con el borde discontinuo.

Las imágenes van en [`public/fotos/`](public/fotos/) y
[`public/documentos/`](public/documentos/); en el JSON se referencian por su ruta
(`/fotos/boda-1930.jpg`).

### Dos reglas al añadir cosas

**1. Distinguir lo documentado de lo recordado.** En `events.json`, el campo
`documented: true` marca lo que está respaldado por un acta, una carta o un
registro que se conserva. Lo demás procede del relato oral de Eric, y la web lo
dice.

**2. Etiquetar siempre lo retocado.** Si una imagen está coloreada, restaurada o
animada con IA, hay que rellenar el campo `retouched` explicando qué se le ha
hecho. La foto de Ana está coloreada y la de la escalera está animada: en las dos
el aviso aparece en la web. El valor de este sitio depende de que se pueda
distinguir un dato de una reconstrucción.

## Estructura

```
app/                 páginas y estilos globales (sistema de diseño en globals.css)
components/          Sello, Reveal, Nav, Seccion
components/sections/ una por cada sección de la web
content/             el contenido, en JSON
public/              fotos y documentos
```

## El archivo de investigación

La web es la parte visible de un trabajo más grande. Ese material —
transcripciones, actas, fotos sin recortar, documentos familiares — vive en un
**repositorio privado aparte**, `archivo`, y no forma parte de este repositorio:

- `historiaOrdenada.md` — la historia completa, el árbol, la cronología y las
  preguntas abiertas.
- `geneanet-investigacion.md` — las transcripciones de actas y qué queda por
  buscar.
- `rama-valenciana-notas.md` — el capítulo español, pendiente de escribir.

En una copia de trabajo local, `archivo/` es el directorio hermano de este.

## Nota sobre privacidad

El sitio contiene documentos personales y datos de personas vivas. Por eso lleva
`robots: noindex` en [`app/layout.tsx`](app/layout.tsx): no se indexa en
buscadores. Si en algún momento se decide hacerlo público de verdad, esa es la
línea que hay que cambiar — conviene decidirlo a conciencia.

## Notas de diseño

Concepto: **cuaderno de viaje familiar**. Tinta `#1B2A4A`, papel `#EDE6D6`, verde
botella `#3D5A45` y rojo óxido `#8B3A2E` para lo puntual. Titulares en Fraunces,
datos y fechas en Special Elite. El sello de matasellos
([`components/Sello.tsx`](components/Sello.tsx)) es el elemento firma y se
reutiliza en portada, mapa y línea del tiempo.

El movimiento respeta `prefers-reduced-motion` y el foco de teclado es siempre
visible.

> ⚠️ Las variables de las fuentes se aplican en `<html>`, no en `<body>`: los
> tokens del tema se declaran en `:root` y resuelven ahí sus `var()`. Si se mueven
> a `<body>`, las tipografías dejan de cargar silenciosamente.
