/**
 * Genera la línea de costa del mapa de desplazamientos.
 *
 * Solo costa, sin fronteras: las de hoy no son las de esta historia — Argelia
 * era francesa, y Ucrania y Besarabia formaban parte del Imperio ruso.
 *
 * Se calcula una sola vez y se guarda en content/mapa-tierra.json, para que
 * el sitio no dependa de ninguna librería cartográfica ni de un servidor de
 * teselas: lo que se publica es un puñado de trazados SVG.
 *
 *   node scripts/generar-mapa.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { feature } from "topojson-client";

// Mismo encuadre y misma proyección que components/sections/Mapa.tsx
const LON = [-9, 38];
const LAT = [28, 51];
const W = 1000;
const H = 640;
const MARGEN = 6; // grados de holgura antes de descartar un polígono

const x = (lng) => ((lng - LON[0]) / (LON[1] - LON[0])) * W;
const y = (lat) => ((LAT[1] - lat) / (LAT[1] - LAT[0])) * H;

const topo = JSON.parse(
  readFileSync("node_modules/world-atlas/land-110m.json", "utf8"),
);
const geo = feature(topo, topo.objects.land);

/** ¿Toca este anillo el recuadro del mapa? */
const interesa = (anillo) => {
  let [x0, y0, x1, y1] = [Infinity, Infinity, -Infinity, -Infinity];
  for (const [lng, lat] of anillo) {
    x0 = Math.min(x0, lng);
    x1 = Math.max(x1, lng);
    y0 = Math.min(y0, lat);
    y1 = Math.max(y1, lat);
  }
  return (
    x1 >= LON[0] - MARGEN &&
    x0 <= LON[1] + MARGEN &&
    y1 >= LAT[0] - MARGEN &&
    y0 <= LAT[1] + MARGEN
  );
};

/** Simplifica quitando puntos que apenas mueven el trazo. */
const aliviar = (puntos, tol = 1.6) => {
  const salida = [puntos[0]];
  for (const p of puntos.slice(1)) {
    const u = salida[salida.length - 1];
    if (Math.hypot(p[0] - u[0], p[1] - u[1]) >= tol) salida.push(p);
  }
  return salida.length >= 3 ? salida : null;
};

const trazados = [];
for (const f of geo.features) {
  const geom = f.geometry;
  if (!geom) continue;
  const polis =
    geom.type === "Polygon" ? [geom.coordinates] : geom.coordinates ?? [];
  for (const poli of polis) {
    for (const anillo of poli) {
      if (!interesa(anillo)) continue;
      const puntos = aliviar(anillo.map(([lng, lat]) => [x(lng), y(lat)]));
      if (!puntos) continue;
      trazados.push(
        "M " +
          puntos
            .map(([px, py]) => `${px.toFixed(1)} ${py.toFixed(1)}`)
            .join(" L ") +
          " Z",
      );
    }
  }
}

writeFileSync(
  "content/mapa-tierra.json",
  JSON.stringify({ lon: LON, lat: LAT, w: W, h: H, trazados }, null, 1) + "\n",
);
console.log(
  `${trazados.length} trazados · ${(JSON.stringify(trazados).length / 1024).toFixed(0)} kB`,
);
