import type { FamilyEvent } from "@/content/types";
import eventos from "@/content/events.json";
import { Reveal } from "@/components/Reveal";
import { Sello } from "@/components/Sello";
import { dic, t, type Lang } from "@/lib/i18n";

const EVENTOS = (eventos as FamilyEvent[]).sort((a, b) => a.year - b.year);

export function LineaTiempo({ lang }: { lang: Lang }) {
  const d = dic(lang);

  return (
    <ol className="relative space-y-10 border-l border-tinta/20 pl-6 sm:pl-10">
      {EVENTOS.map((e, i) => (
        <li key={e.id} className="relative">
          <span
            aria-hidden
            className={`absolute top-2 left-[-1.9rem] size-2.5 rounded-full sm:left-[-2.9rem] ${
              e.key ? "bg-oxido" : "bg-tinta/35"
            }`}
          />
          <Reveal delay={i % 3 === 0 ? 0 : 60}>
            <article className={e.key ? "hoja rounded-sm p-5 sm:p-6" : "py-1"}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span
                  className="text-2xl text-oxido"
                  style={{ fontFamily: "var(--font-maquina)" }}
                >
                  {e.year}
                </span>
                {e.dateLabel ? (
                  <span className="dato text-tinta/50">{t(e.dateLabel, lang)}</span>
                ) : null}
                {e.documented ? (
                  <span className="dato rounded-sm border border-verde/40 px-1.5 py-0.5 text-verde">
                    {d.tiempo.documentado}
                  </span>
                ) : null}
              </div>

              <h3
                className="mt-1.5 text-xl sm:text-2xl"
                style={{ fontFamily: "var(--font-titular)" }}
              >
                {t(e.title, lang)}
              </h3>

              {e.location ? (
                <p className="dato mt-1 text-tinta/55">{t(e.location, lang)}</p>
              ) : null}

              {e.description ? (
                <p className="mt-3 max-w-2xl leading-relaxed text-tinta/80">
                  {t(e.description, lang)}
                </p>
              ) : null}
            </article>
          </Reveal>
        </li>
      ))}

      <li className="relative pt-4">
        <Reveal>
          <Sello
            ciudad="Valencia"
            año={d.tiempo.hoy}
            size={104}
            tono="tinta"
            className="-rotate-3"
          />
        </Reveal>
      </li>
    </ol>
  );
}
