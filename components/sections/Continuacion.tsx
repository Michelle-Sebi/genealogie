import { Reveal } from "@/components/Reveal";
import { Sello } from "@/components/Sello";
import { dic, type Lang } from "@/lib/i18n";

export function Continuacion({ lang }: { lang: Lang }) {
  const d = dic(lang);

  return (
    <div className="space-y-14">
      <Reveal>
        <div className="hoja rounded-sm p-7 sm:p-10">
          <p
            className="max-w-3xl text-xl leading-relaxed sm:text-2xl"
            style={{ fontFamily: "var(--font-titular)" }}
          >
            {d.final.cita}
          </p>
          <p className="dato mt-6 text-tinta/60">{d.final.firma}</p>
          <p className="mt-8 max-w-3xl leading-relaxed text-tinta/85">
            {d.final.cierre}
          </p>
        </div>
      </Reveal>

      <div>
        <h3 className="text-2xl" style={{ fontFamily: "var(--font-titular)" }}>
          {d.final.faltaTitulo}
        </h3>
        <p className="mt-2 max-w-2xl leading-relaxed text-tinta/70">
          {d.final.faltaEntradilla}
        </p>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {d.final.pendiente.map((p, i) => (
            <li key={p.t}>
              <Reveal delay={(i % 2) * 80}>
                <article className="h-full rounded-sm border border-dashed border-tinta/30 p-5">
                  <h4
                    className="text-lg"
                    style={{ fontFamily: "var(--font-titular)" }}
                  >
                    {p.t}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-tinta/70">
                    {p.d}
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      <Reveal>
        <div className="flex flex-col items-center gap-5 border-t border-tinta/15 pt-12 text-center">
          <Sello
            ciudad="Guelma"
            año={1885}
            size={120}
            tono="verde"
            className="-rotate-6"
          />
          <p className="max-w-md leading-relaxed text-tinta/70">
            {d.final.invitacion}
          </p>
          <p className="dato text-tinta/45">{d.final.pie}</p>
        </div>
      </Reveal>
    </div>
  );
}
