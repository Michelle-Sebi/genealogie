import type { Tradition } from "@/content/types";
import tradiciones from "@/content/traditions.json";
import { Reveal } from "@/components/Reveal";
import { dic, t, type Lang } from "@/lib/i18n";

const ITEMS = tradiciones as Tradition[];

export function Tradiciones({ lang }: { lang: Lang }) {
  const d = dic(lang);

  return (
    <div className="columns-1 gap-5 md:columns-2 *:mb-5 *:break-inside-avoid">
      {ITEMS.map((item, i) => (
        <Reveal key={item.id} delay={(i % 2) * 80}>
          <article className="hoja rounded-sm p-6">
            <p className="dato text-verde">{d.tradicionesCat[item.category]}</p>
            <h3
              className="mt-2 text-2xl leading-snug"
              style={{ fontFamily: "var(--font-titular)" }}
            >
              {t(item.title, lang)}
            </h3>
            <p className="mt-3 leading-relaxed text-tinta/80">
              {t(item.content, lang)}
            </p>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
