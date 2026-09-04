"use client";

import Image from "next/image";
import { useState } from "react";
import type { Person } from "@/content/types";
import personas from "@/content/people.json";
import { dic, t, type Lang } from "@/lib/i18n";
import { ArbolGrafico } from "@/components/sections/ArbolGrafico";

const PERSONAS = personas as Person[];
const GENERACIONES: Person["generation"][] = [1, 2, 3, 4, 5, 6];
/**
 * Las dos ramas que no pertenecen al tronco de Guelma. Cada una se dibuja
 * después de la generación con la que enlaza: Ana justo detrás de su padre,
 * los Saura detrás de la generación con la que se casaron.
 */
const RAMAS = [
  { id: "ucrania", tras: 1, borde: "border-oxido/40" },
  { id: "guez", tras: 2, borde: "border-tinta/30" },
  { id: "consortes", tras: 4, borde: "border-tinta/25" },
  { id: "valenciana", tras: 4, borde: "border-verde/40" },
] as const;

function Ficha({
  p,
  lang,
  abierta,
  alPulsar,
  nacioEn,
}: {
  p: Person;
  lang: Lang;
  abierta: boolean;
  alPulsar: () => void;
  nacioEn: string;
}) {
  const vida = [p.birthYear, p.deathYear].some(Boolean)
    ? `${p.birthYear ?? "?"} – ${p.deathYear ?? ""}`.replace(/ – $/, " –")
    : null;

  return (
    <article
      id={`ficha-${p.id}`}
      className={`hoja scroll-mt-24 rounded-sm transition-shadow ${abierta ? "sm:col-span-2 lg:col-span-3" : ""}`}
    >
      <button
        type="button"
        onClick={alPulsar}
        aria-expanded={abierta}
        className="flex w-full items-start gap-4 p-4 text-left"
      >
        {p.photo ? (
          // Solo se reencuadra, nunca se amplía: los originales no tienen
          // definición para acercarse a la cara sin deshacerla.
          <span className="relative block size-16 shrink-0 overflow-hidden rounded-sm">
            <Image
              src={p.photo}
              alt=""
              fill
              sizes="96px"
              style={{
                objectPosition: p.photoPosition ?? "center 25%",
              }}
              className="object-cover sepia-[0.3]"
            />
          </span>
        ) : (
          <span
            aria-hidden
            className="flex size-16 shrink-0 items-center justify-center rounded-sm border border-tinta/15 bg-papel-hondo/50 text-xl text-tinta/35"
            style={{ fontFamily: "var(--font-titular)" }}
          >
            {p.fullName.charAt(0)}
          </span>
        )}

        <span className="min-w-0 flex-1">
          <span
            className="block text-lg leading-tight"
            style={{ fontFamily: "var(--font-titular)" }}
          >
            {p.fullName}
          </span>
          {p.nickname ? (
            <span className="block text-sm text-tinta/60 italic">
              {t(p.nickname, lang)}
            </span>
          ) : null}
          {vida ? <span className="dato mt-1 block text-oxido">{vida}</span> : null}
          {p.role ? (
            <span className="dato mt-0.5 block text-verde">{t(p.role, lang)}</span>
          ) : null}
        </span>
      </button>

      {abierta && p.bio ? (
        <div className="border-t border-tinta/10 px-4 pt-4 pb-5">
          <div
            className={
              p.photo
                ? "grid gap-6 sm:grid-cols-[minmax(0,15rem)_1fr] sm:items-start"
                : ""
            }
          >
            {/* Con la ficha abierta la foto se ve de verdad: en miniatura, de
                algunos de ellos no se distingue ni la cara. */}
            {p.photo ? (
              <figure className="hoja rounded-sm p-2">
                <Image
                  src={p.photo}
                  alt={p.fullName}
                  width={480}
                  height={480}
                  className="h-auto w-full rounded-sm object-cover sepia-[0.2]"
                />
                {p.photoCaption ? (
                  <figcaption className="dato px-1 pt-2 leading-relaxed tracking-normal text-tinta/55 normal-case">
                    {t(p.photoCaption, lang)}
                  </figcaption>
                ) : null}
              </figure>
            ) : null}

            <div>
              {p.birthPlace ? (
                <p className="dato mb-3 text-tinta/55">
                  {nacioEn} {p.birthPlace}
                </p>
              ) : null}
              <p className="max-w-3xl leading-relaxed text-tinta/85">
                {t(p.bio, lang)}
              </p>
              {p.photoNote ? (
                <p className="dato mt-4 border-l-2 border-oxido/40 pl-3 leading-relaxed tracking-normal text-tinta/50 normal-case">
                  {t(p.photoNote, lang)}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </article>
  );
}

export function Arbol({ lang }: { lang: Lang }) {
  const [abierta, setAbierta] = useState<string | null>("achir-sebi");
  const d = dic(lang);

  // Al pulsar un nombre del dibujo se abre su ficha y se baja hasta ella.
  const elegir = (id: string) => {
    setAbierta(id);
    requestAnimationFrame(() =>
      document
        .getElementById(`ficha-${id}`)
        ?.scrollIntoView({ block: "center", behavior: "smooth" }),
    );
  };

  return (
    <div className="space-y-14">
      <div>
        <ArbolGrafico lang={lang} seleccion={abierta} alElegir={elegir} />
        <p className="dato mt-3 text-tinta/50">{d.arbol.grafico.aviso}</p>
      </div>

      {GENERACIONES.map((gen, i) => {
        // Quien viene de otra familia no cabe bajo un título como «los que
        // salieron»: no salió de Argelia. Va en su propio bloque.
        const gente = PERSONAS.filter(
          (p) => p.generation === gen && !p.branch,
        );
        if (gente.length === 0) return null;
        const cab = d.arbol.generaciones[i];

        return (
          <div key={gen}>
            <section aria-label={cab.titulo}>
              <div className="mb-5 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-tinta/15 pb-2">
                <h3
                  className="text-xl text-tinta"
                  style={{ fontFamily: "var(--font-titular)" }}
                >
                  {cab.titulo}
                </h3>
                <p className="dato text-tinta/50">{cab.pie}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {gente.map((p) => (
                  <Ficha
                    key={p.id}
                    p={p}
                    lang={lang}
                    nacioEn={d.arbol.nacioEn}
                    abierta={abierta === p.id}
                    alPulsar={() => setAbierta(abierta === p.id ? null : p.id)}
                  />
                ))}
              </div>
            </section>

            {RAMAS.filter((r) => r.tras === gen).map((rama) => {
              const gente = PERSONAS.filter((p) => p.branch === rama.id);
              if (gente.length === 0) return null;
              const cab = d.arbol.ramas[rama.id];

              return (
                <section
                  key={rama.id}
                  aria-label={cab.titulo}
                  className={`mt-14 border-l-2 border-dashed pl-5 sm:pl-7 ${rama.borde}`}
                >
                  <div className="mb-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3
                      className="text-xl text-tinta"
                      style={{ fontFamily: "var(--font-titular)" }}
                    >
                      {cab.titulo}
                    </h3>
                    <p className="dato text-tinta/50">{cab.pie}</p>
                  </div>
                  <p className="mb-5 max-w-2xl leading-relaxed text-tinta/70">
                    {cab.nota}
                  </p>

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {gente.map((p) => (
                      <Ficha
                        key={p.id}
                        p={p}
                        lang={lang}
                        nacioEn={d.arbol.nacioEn}
                        abierta={abierta === p.id}
                        alPulsar={() =>
                          setAbierta(abierta === p.id ? null : p.id)
                        }
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
