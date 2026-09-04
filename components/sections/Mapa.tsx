"use client";

import { useState } from "react";
import type { Place } from "@/content/types";
import lugares from "@/content/places.json";
import tierra from "@/content/mapa-tierra.json";
import { Sello } from "@/components/Sello";
import { dic, t, type Lang } from "@/lib/i18n";

const PLACES = lugares as Place[];

// Proyección equirectangular sobre el corredor mediterráneo, que es donde
// ocurre casi todo. Costa de Marfil queda muy al sur y se dibuja aparte,
// como una anotación al margen del mapa.
const LON = [-9, 38] as const;
const LAT = [28, 51] as const;
const W = 1000;
const H = 640;

const x = (lng: number) => ((lng - LON[0]) / (LON[1] - LON[0])) * W;
const y = (lat: number) => ((LAT[1] - lat) / (LAT[1] - LAT[0])) * H;

const FUERA_DE_MAPA = "abiyan";

/** Colocación de cada rótulo. Es presentación, por eso no vive en el JSON. */
const ROTULO: Record<string, { dx: number; dy: number; fin?: boolean }> = {
  varna: { dx: 14, dy: 5 },
  jerusalen: { dx: -18, dy: 5, fin: true },
  guelma: { dx: 4, dy: -14, fin: true },
  "souk-ahras": { dx: 14, dy: 20 },
  bone: { dx: 16, dy: -8 },
  constantina: { dx: -16, dy: 6, fin: true },
  batna: { dx: -16, dy: 20, fin: true },
  timgad: { dx: 10, dy: 26 },
  hassi: { dx: 14, dy: 6 },
  nolay: { dx: -14, dy: -8, fin: true },
  chalon: { dx: 15, dy: 6 },
  autun: { dx: -14, dy: 14, fin: true },
  toulouse: { dx: -14, dy: 6, fin: true },
  valencia: { dx: -14, dy: 6, fin: true },
  paris: { dx: 14, dy: 0 },
};

const RUTA = PLACES.filter((p) => p.onRoute).sort(
  (a, b) => (a.order ?? 0) - (b.order ?? 0),
);

export function Mapa({ lang }: { lang: Lang }) {
  const [activo, setActivo] = useState<string>("guelma");
  const d = dic(lang);
  const lugar = PLACES.find((p) => p.id === activo) ?? PLACES[0];

  const enMapa = PLACES.filter((p) => p.id !== FUERA_DE_MAPA);
  const costaMarfil = PLACES.find((p) => p.id === FUERA_DE_MAPA);

  // La ruta sale del mapa por abajo hacia Costa de Marfil y vuelve a Valencia.
  const trazado = RUTA.map(
    (p, i) => `${i === 0 ? "M" : "L"} ${x(p.lng).toFixed(1)} ${y(p.lat).toFixed(1)}`,
  ).join(" ");

  return (
    <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
      <div className="hoja rounded-sm p-3">
        <svg
          viewBox={`0 0 ${W} ${H + 74}`}
          className="h-auto w-full"
          role="img"
          aria-label={d.secciones.mapa.titulo}
        >
          {/* La costa. Generada una vez con scripts/generar-mapa.mjs a partir
              de datos cartográficos, y guardada como trazados: el sitio no
              depende de ninguna librería de mapas ni de teselas externas. */}
          <g>
            <rect x="0" y="0" width={W} height={H} fill="#DCE3E0" opacity="0.5" />
            {tierra.trazados.map((d, i) => (
              <path
                key={i}
                d={d}
                fill="#E7E0CE"
                stroke="#3D5A45"
                strokeWidth="0.7"
                strokeOpacity="0.45"
              />
            ))}
          </g>

          <g stroke="#1B2A4A" opacity="0.1" strokeWidth="0.8">
            {[-5, 5, 15, 25, 35].map((l) => (
              <line key={`m${l}`} x1={x(l)} y1={0} x2={x(l)} y2={H} />
            ))}
            {[30, 35, 40, 45, 50].map((l) => (
              <line key={`p${l}`} x1={0} y1={y(l)} x2={W} y2={y(l)} />
            ))}
          </g>

          <path
            d={trazado}
            fill="none"
            stroke="#3D5A45"
            strokeWidth="2.2"
            strokeDasharray="8 7"
            opacity="0.8"
            strokeLinecap="round"
          />

          {enMapa.map((p) => {
            const sel = p.id === activo;
            const enRuta = Boolean(p.onRoute);
            const r = ROTULO[p.id] ?? { dx: 14, dy: 5 };
            return (
              <g
                key={p.id}
                className="cursor-pointer"
                onMouseEnter={() => setActivo(p.id)}
                onClick={() => setActivo(p.id)}
              >
                {sel ? (
                  <circle
                    cx={x(p.lng)}
                    cy={y(p.lat)}
                    r="15"
                    fill="none"
                    stroke="#8B3A2E"
                    strokeWidth="1.2"
                    opacity="0.5"
                  />
                ) : null}
                <circle
                  cx={x(p.lng)}
                  cy={y(p.lat)}
                  r={sel ? 7.5 : enRuta ? 5.5 : 3.5}
                  fill={sel ? "#8B3A2E" : enRuta ? "#1B2A4A" : "#3D5A45"}
                  opacity={sel ? 1 : enRuta ? 0.85 : 0.6}
                />
                <text
                  x={x(p.lng) + r.dx}
                  y={y(p.lat) + r.dy}
                  textAnchor={r.fin ? "end" : "start"}
                  fontFamily="var(--font-maquina)"
                  fontSize="16"
                  fill={sel ? "#8B3A2E" : "#1B2A4A"}
                  opacity={sel ? 1 : enRuta ? 0.8 : 0.5}
                >
                  {p.city}
                </text>
                <circle cx={x(p.lng)} cy={y(p.lat)} r="20" fill="transparent" />
              </g>
            );
          })}

          {/* Costa de Marfil, fuera de encuadre */}
          {costaMarfil ? (
            <g
              className="cursor-pointer"
              onMouseEnter={() => setActivo(costaMarfil.id)}
              onClick={() => setActivo(costaMarfil.id)}
            >
              <path
                d={`M ${x(6)} ${y(31.4)} L ${x(6)} ${H + 40}`}
                stroke="#3D5A45"
                strokeWidth="1.6"
                strokeDasharray="6 6"
                opacity="0.55"
                fill="none"
              />
              <text
                x={x(6)}
                y={H + 62}
                textAnchor="middle"
                fontFamily="var(--font-maquina)"
                fontSize="16"
                fill={activo === costaMarfil.id ? "#8B3A2E" : "#1B2A4A"}
                opacity={activo === costaMarfil.id ? 1 : 0.65}
              >
                {lang === "fr" ? "↓ Côte d'Ivoire, 1965" : "↓ Costa de Marfil, 1965"}
              </text>
            </g>
          ) : null}
        </svg>
      </div>

      <div>
        <div className="hoja min-h-56 rounded-sm p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl" style={{ fontFamily: "var(--font-titular)" }}>
                {lugar.city}
              </h3>
              <p className="dato mt-1 text-tinta/60">{t(lugar.country, lang)}</p>
            </div>
            {lugar.yearArrived ? (
              <Sello
                ciudad={lugar.city}
                año={lugar.yearArrived}
                size={84}
                tono="verde"
                className="shrink-0 -rotate-3"
              />
            ) : null}
          </div>
          {lugar.yearLabel ? (
            <p className="dato mt-3 text-oxido">{t(lugar.yearLabel, lang)}</p>
          ) : null}
          <p className="mt-4 leading-relaxed text-tinta/85">{t(lugar.note, lang)}</p>
        </div>

        <ul className="mt-5 flex flex-wrap gap-2">
          {PLACES.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => setActivo(p.id)}
                aria-pressed={p.id === activo}
                className={`dato rounded-sm border px-2.5 py-1.5 transition-colors ${
                  p.id === activo
                    ? "border-oxido bg-oxido text-papel"
                    : "border-tinta/25 text-tinta/70 hover:border-tinta/60 hover:text-tinta"
                }`}
              >
                {p.city}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
