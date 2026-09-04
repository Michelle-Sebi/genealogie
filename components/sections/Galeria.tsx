"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { MediaItem } from "@/content/types";
import media from "@/content/media.json";
import { dic, t, type Lang } from "@/lib/i18n";

const ITEMS = media as MediaItem[];

export function Galeria({ lang }: { lang: Lang }) {
  const [decada, setDecada] = useState<number | null>(null);
  const [abierto, setAbierto] = useState<string | null>(null);
  const d = dic(lang);

  const decadas = useMemo(
    () => [...new Set(ITEMS.map((m) => m.decade))].sort((a, b) => a - b),
    [],
  );

  const visibles = decada ? ITEMS.filter((m) => m.decade === decada) : ITEMS;

  const btn = (activo: boolean) =>
    `dato rounded-sm border px-3 py-1.5 transition-colors ${
      activo
        ? "border-oxido bg-oxido text-papel"
        : "border-tinta/25 text-tinta/70 hover:border-tinta/60 hover:text-tinta"
    }`;

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setDecada(null)}
          aria-pressed={decada === null}
          className={btn(decada === null)}
        >
          {d.galeria.todo}
        </button>
        {decadas.map((dec) => (
          <button
            key={dec}
            type="button"
            onClick={() => setDecada(dec)}
            aria-pressed={decada === dec}
            className={btn(decada === dec)}
          >
            {dec}s
          </button>
        ))}
      </div>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visibles.map((m) => {
          const activo = abierto === m.id;
          return (
            <li key={m.id} className={activo ? "sm:col-span-2 lg:col-span-3" : ""}>
              <figure className="hoja h-full rounded-sm p-3">
                <button
                  type="button"
                  onClick={() => setAbierto(activo ? null : m.id)}
                  aria-expanded={activo}
                  className="block w-full text-left"
                >
                  <span
                    className={`relative block w-full overflow-hidden rounded-sm bg-papel-hondo/40 ${
                      activo ? "h-[26rem] sm:h-[34rem]" : "h-56"
                    }`}
                  >
                    <Image
                      src={m.url}
                      alt={t(m.caption, lang)}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={`sepia-[0.25] ${activo ? "object-contain" : "object-cover"}`}
                    />
                  </span>

                  <figcaption className="px-1 pt-3">
                    <span className="dato text-oxido">
                      {m.decade}s · {d.galeria.tipos[m.type]}
                    </span>
                    <span
                      className="mt-1 block text-lg leading-snug"
                      style={{ fontFamily: "var(--font-titular)" }}
                    >
                      {t(m.caption, lang)}
                    </span>
                  </figcaption>
                </button>

                {activo ? (
                  <div className="px-1 pt-3 pb-1">
                    {m.detail ? (
                      <p className="max-w-3xl leading-relaxed text-tinta/80">
                        {t(m.detail, lang)}
                      </p>
                    ) : null}
                    {m.retouched ? (
                      <p className="mt-4 border-l-2 border-oxido/50 pl-3 text-sm leading-relaxed text-tinta/60">
                        <span className="dato text-oxido">{d.galeria.retocada}</span>
                        {t(m.retouched, lang)}
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </figure>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
