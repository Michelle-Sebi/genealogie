"use client";

import { useMemo, useState } from "react";
import type { Person } from "@/content/types";
import personas from "@/content/people.json";
import grafico from "@/content/arbol-grafico.json";
import { dic, t, type Lang, type Localized } from "@/lib/i18n";

const PERSONAS = personas as Person[];

type Nodo = { fila: number; col: number };
type Fantasma = { id: string; nombre: Localized; anos: Localized };
type Union = {
  id: string;
  a: string;
  /** Puede faltar: de algunas madres no consta el padre. */
  b?: string;
  ano?: string;
  /** Quién se dibuja a la izquierda. Por defecto, «a». */
  izq?: string;
  segunda?: boolean;
  /** Pareja separada: se marca con las dos barras habituales. */
  separada?: boolean;
  /** Altura del carril de los hijos, en píxeles por encima de su fila.
   *  Se sube cuando por debajo tiene que pasar otra bajada sin cruzarse. */
  carril?: number;
  hijos: string[];
};

const NODOS = grafico.nodos as Record<string, Nodo>;
const FANTASMAS = grafico.fantasmas as Fantasma[];
const UNIONES = grafico.uniones as Union[];
const CORTOS = grafico.nombresCortos as Record<string, string>;
const GENERACIONES = grafico.generaciones as { fila: number; anos: string }[];

// Geometría del dibujo, en unidades del viewBox.
const COL = 178;
const FILA = 240;
const H = 92;
const MARGEN = 26;
/** Sitio a la izquierda para la regla de años. */
const CANAL = 168;
const ANCHO_MIN = 132;
const ANCHO_MAX = 204;
/** Hueco fijo entre las dos cajas de un matrimonio, para que todas las
 *  líneas midan lo mismo y quepa el año encima. */
const HUECO_PAREJA = 52;

/** Una pila legible: en un diagrama denso, la letra de máquina no se lee. */
const SANS =
  "ui-sans-serif, system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const PERSONA = new Map(PERSONAS.map((p) => [p.id, p]));
const FANTASMA = new Map(FANTASMAS.map((f) => [f.id, f]));

function vida(p: Person) {
  if (!p.birthYear && !p.deathYear) return "";
  return `${p.birthYear ?? "?"}–${p.deathYear ?? ""}`.replace(/–$/, "–");
}

/** Ancho aproximado de un texto, para ajustar la caja al nombre. */
const mide = (texto: string, px: number, factor: number) =>
  texto.length * px * factor;

/** Textos de una caja. El idioma no cambia el ancho de forma apreciable, así
 *  que se mide con el castellano y vale para los dos. */
function textos(id: string) {
  const p = PERSONA.get(id);
  const f = FANTASMA.get(id);
  return {
    nombre: CORTOS[id] ?? (p ? p.fullName : f ? f.nombre.es : id),
    apodo: p?.nickname ? p.nickname.es : null,
    bajo: p ? vida(p) : f ? f.anos.es : "",
  };
}

const ANCHOS: Record<string, number> = Object.fromEntries(
  Object.keys(NODOS).map((id) => {
    const { nombre, apodo, bajo } = textos(id);
    const necesario = Math.max(
      mide(nombre, 20, 0.58),
      apodo ? mide(apodo, 17, 0.5) : 0,
      mide(bajo, 18, 0.55),
    );
    return [id, Math.min(ANCHO_MAX, Math.max(ANCHO_MIN, necesario + 30))];
  }),
);

/**
 * Centro de cada caja. Parte de la rejilla, pero a los cónyuges de una misma
 * fila se les recoloca pegados a su pareja con un hueco constante: así todas
 * las líneas de matrimonio miden lo mismo y ninguna queda escondida.
 */
const CENTROS: Record<string, number> = Object.fromEntries(
  Object.keys(NODOS).map((id) => [
    id,
    CANAL + NODOS[id].col * COL + ANCHO_MIN / 2,
  ]),
);
for (const u of UNIONES) {
  if (!u.b) continue;
  if (NODOS[u.a].fila !== NODOS[u.b].fila) continue;
  const izq = u.izq ?? u.a;
  const der = izq === u.a ? u.b! : u.a;
  CENTROS[der] =
    CENTROS[izq] + (ANCHOS[izq] + ANCHOS[der]) / 2 + HUECO_PAREJA;
}

const yFila = (fila: number) => MARGEN + fila * FILA;
const y = (id: string) => yFila(NODOS[id].fila);
const cx = (id: string) => CENTROS[id];
const cy = (id: string) => y(id) + H / 2;

const ancho =
  Math.max(...Object.keys(NODOS).map((id) => CENTROS[id] + ANCHOS[id] / 2)) +
  MARGEN;
const alto =
  Math.max(...Object.values(NODOS).map((n) => n.fila)) * FILA + H + MARGEN * 2;

/** Sube por el árbol hasta Achir y Zmirda, recogiendo el camino entero. */
function ascendencia(id: string) {
  const nodos = new Set<string>([id]);
  const ramas = new Set<string>();
  const cola = [id];

  while (cola.length) {
    const actual = cola.shift()!;
    const u = UNIONES.find((v) => v.hijos.includes(actual));
    if (!u) continue;
    ramas.add(`${u.id}:${actual}`);
    for (const padre of [u.a, u.b]) {
      if (padre && !nodos.has(padre)) {
        nodos.add(padre);
        cola.push(padre);
      }
    }
  }
  return { nodos, ramas };
}

const carrilDe = (u: Union) => {
  const hijos = u.hijos.filter((h) => NODOS[h]);
  return hijos.length
    ? Math.min(...hijos.map((h) => y(h))) - (u.carril ?? 46)
    : 0;
};

export function ArbolGrafico({
  lang,
  seleccion,
  alElegir,
}: {
  lang: Lang;
  seleccion: string | null;
  alElegir: (id: string) => void;
}) {
  const d = dic(lang);
  const [sobre, setSobre] = useState<string | null>(null);
  const camino = useMemo(() => (sobre ? ascendencia(sobre) : null), [sobre]);

  const etiquetas = (id: string) => {
    const p = PERSONA.get(id);
    const f = FANTASMA.get(id);
    return {
      p,
      f,
      nombre: CORTOS[id] ?? (p ? p.fullName : f ? t(f.nombre, lang) : id),
      apodo: p?.nickname ? t(p.nickname, lang) : null,
      bajo: p ? vida(p) : f ? t(f.anos, lang) : "",
    };
  };

  return (
    <figure className="hoja rounded-sm p-3">
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${ancho} ${alto}`}
          style={{ minWidth: ancho / 2 }}
          className="h-auto w-full"
          role="img"
          aria-label={d.arbol.grafico.titulo}
          onMouseLeave={() => setSobre(null)}
        >
          {/* Regla de generaciones: los años aproximados de cada altura. */}
          <g>
            <line
              x1={CANAL - 46}
              y1={yFila(GENERACIONES[0].fila) + 6}
              x2={CANAL - 46}
              y2={yFila(GENERACIONES[GENERACIONES.length - 1].fila) + H - 6}
              stroke="#1B2A4A"
              strokeWidth="1.2"
              opacity="0.3"
            />
            {GENERACIONES.map((g) => (
              <g key={g.fila}>
                <line
                  x1={CANAL - 52}
                  y1={yFila(g.fila) + H / 2}
                  x2={CANAL - 40}
                  y2={yFila(g.fila) + H / 2}
                  stroke="#1B2A4A"
                  strokeWidth="1.2"
                  opacity="0.4"
                />
                <text
                  x={CANAL - 62}
                  y={yFila(g.fila) + H / 2 + 5}
                  textAnchor="end"
                  fontFamily={SANS}
                  fontSize="16"
                  fill="#1B2A4A"
                  opacity="0.55"
                >
                  {g.anos}
                </text>
              </g>
            ))}
          </g>

          {/* Las uniones. Se atenúan cuando hay un camino resaltado. */}
          <g opacity={camino ? 0.25 : 1}>
            {UNIONES.map((u) => {
              const x1 = cx(u.a);
              const y1 = cy(u.a);
              const x2 = u.b ? cx(u.b) : cx(u.a);
              const y2 = u.b ? cy(u.b) : cy(u.a);
              const mx = (x1 + x2) / 2;
              const my = (y1 + y2) / 2;

              const hijos = u.hijos.filter((h) => NODOS[h]);
              const carril = carrilDe(u);

              const mismaFila = u.b ? NODOS[u.a].fila === NODOS[u.b].fila : true;
              const arriba =
                u.b && NODOS[u.b].fila < NODOS[u.a].fila ? u.b : u.a;
              const abajo = arriba === u.a ? u.b! : u.a;
              const banda = y(abajo) - 20;
              const codo = `M ${cx(abajo)} ${y(abajo)} V ${banda} H ${cx(arriba)} V ${y(arriba) + H}`;
              const desvio = mismaFila ? y(u.a) + H + 30 : banda;

              return (
                <g key={u.id}>
                  {!mismaFila ? (
                    <path
                      d={codo}
                      fill="none"
                      stroke={u.segunda ? "#8B3A2E" : "#3D5A45"}
                      strokeWidth={u.segunda ? 1.4 : 1.8}
                      strokeDasharray={u.segunda ? "5 6" : undefined}
                      opacity={u.segunda ? 0.7 : 0.75}
                    />
                  ) : u.segunda ? (
                    <path
                      d={`M ${x1} ${y(u.a) + H} V ${desvio} H ${x2} V ${y(u.b!) + H}`}
                      fill="none"
                      stroke="#8B3A2E"
                      strokeWidth="1.4"
                      strokeDasharray="5 6"
                      opacity="0.7"
                    />
                  ) : (
                    <line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#3D5A45"
                      strokeWidth="1.8"
                      opacity="0.75"
                    />
                  )}

                  {u.separada ? (
                    <g stroke="#8B3A2E" strokeWidth="1.6" opacity="0.7">
                      <line x1={mx - 7} y1={my + 8} x2={mx - 1} y2={my - 8} />
                      <line x1={mx + 1} y1={my + 8} x2={mx + 7} y2={my - 8} />
                    </g>
                  ) : null}

                  {u.ano ? (
                    <text
                      x={mismaFila ? mx : (cx(u.a) + cx(u.b ?? u.a)) / 2}
                      // Con las cajas ajustadas al nombre, el hueco entre
                      // cónyuges es estrecho: el año se saca encima de ellas.
                      y={
                        mismaFila
                          ? u.segunda
                            ? desvio - 8
                            : y(u.a) - 10
                          : banda - 8
                      }
                      textAnchor="middle"
                      fontFamily={SANS}
                      fontSize="16"
                      fill={u.segunda ? "#8B3A2E" : "#3D5A45"}
                      opacity="0.9"
                    >
                      {u.ano}
                    </text>
                  ) : null}

                  {hijos.length ? (
                    <g
                      stroke="#1B2A4A"
                      strokeWidth="1.4"
                      fill="none"
                      opacity="0.4"
                    >
                      <path d={`M ${mx} ${my} V ${carril}`} />
                      <path
                        d={`M ${Math.min(mx, ...hijos.map(cx))} ${carril} H ${Math.max(mx, ...hijos.map(cx))}`}
                      />
                      {hijos.map((h) => (
                        <path key={h} d={`M ${cx(h)} ${carril} V ${y(h)}`} />
                      ))}
                    </g>
                  ) : null}
                </g>
              );
            })}
          </g>

          {/* El camino resaltado: de quien se señala hasta Achir y Zmirda. */}
          {camino ? (
            <g
              stroke="#8B3A2E"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              opacity="0.9"
            >
              {UNIONES.map((u) => {
                const trozos = u.hijos.filter((h) =>
                  camino.ramas.has(`${u.id}:${h}`),
                );
                if (!trozos.length) return null;
                const mx = (cx(u.a) + cx(u.b ?? u.a)) / 2;
                const my = (cy(u.a) + cy(u.b ?? u.a)) / 2;
                const carril = carrilDe(u);
                return (
                  <g key={u.id}>
                    {u.b ? (
                      <line
                        x1={cx(u.a)}
                        y1={cy(u.a)}
                        x2={cx(u.b)}
                        y2={cy(u.b)}
                      />
                    ) : null}
                    {trozos.map((h) => (
                      <path
                        key={h}
                        d={`M ${mx} ${my} V ${carril} H ${cx(h)} V ${y(h)}`}
                      />
                    ))}
                  </g>
                );
              })}
            </g>
          ) : null}

          {/* Las cajas, encima de las líneas */}
          {Object.keys(NODOS).map((id) => {
            const { p, f, nombre, apodo, bajo } = etiquetas(id);
            const sel = seleccion === id;
            const enCamino = camino?.nodos.has(id) ?? false;
            const apagada = camino !== null && !enCamino;
            const w = ANCHOS[id];
            const texto = sel ? "#EDE6D6" : "#1B2A4A";

            return (
              <g
                key={id}
                onClick={() => (p ? alElegir(id) : undefined)}
                onMouseEnter={() => setSobre(id)}
                onFocus={() => setSobre(id)}
                className={p ? "cursor-pointer" : ""}
                tabIndex={p ? 0 : undefined}
                role={p ? "button" : undefined}
                aria-label={p ? nombre : undefined}
                opacity={apagada ? 0.28 : 1}
                onKeyDown={(e) => {
                  if (p && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    alElegir(id);
                  }
                }}
              >
                <rect
                  x={cx(id) - w / 2}
                  y={y(id)}
                  width={w}
                  height={H}
                  rx="3"
                  fill={sel ? "#8B3A2E" : enCamino ? "#F8F4EA" : "#F5F0E4"}
                  stroke={sel || enCamino ? "#8B3A2E" : "#1B2A4A"}
                  strokeOpacity={sel || enCamino ? 1 : f ? 0.3 : 0.55}
                  strokeWidth={enCamino && !sel ? 2.6 : 1.4}
                  strokeDasharray={f ? "4 4" : undefined}
                />
                <text
                  x={cx(id)}
                  y={y(id) + (apodo ? 30 : 40)}
                  textAnchor="middle"
                  fontFamily={SANS}
                  fontSize="20"
                  fontWeight="600"
                  fill={texto}
                  opacity={f ? 0.65 : 1}
                >
                  {nombre}
                </text>
                {apodo ? (
                  <text
                    x={cx(id)}
                    y={y(id) + 53}
                    textAnchor="middle"
                    fontFamily={SANS}
                    fontSize="17"
                    fontStyle="italic"
                    fill={texto}
                    opacity="0.7"
                  >
                    {apodo}
                  </text>
                ) : null}
                <text
                  x={cx(id)}
                  y={y(id) + H - 16}
                  textAnchor="middle"
                  fontFamily={SANS}
                  fontSize="18"
                  fill={sel ? "#EDE6D6" : "#8B3A2E"}
                  opacity={f ? 0.6 : 0.95}
                >
                  {bajo}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <figcaption className="dato mt-3 flex flex-wrap gap-x-5 gap-y-1 px-1 text-tinta/50">
        <span>{d.arbol.grafico.pieVerde}</span>
        <span className="text-oxido">{d.arbol.grafico.pieRojo}</span>
        <span className="text-oxido">{d.arbol.grafico.pieSeparada}</span>
        <span>{d.arbol.grafico.pieGris}</span>
      </figcaption>
    </figure>
  );
}
