import Image from "next/image";
import { Sello } from "@/components/Sello";
import { SelectorIdioma } from "@/components/SelectorIdioma";
import { dic, type Lang } from "@/lib/i18n";

const ANCLAS = ["#origenes", "#mapa", "#tiempo", "#arbol"];

export function Inicio({ lang }: { lang: Lang }) {
  const d = dic(lang);

  return (
    <header className="relative min-h-svh overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/fotos/figuras-centrales.jpg"
          alt={d.origenes.heroAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-95 contrast-[1.05] sepia-[0.45]"
        />
        {/* Doble velo: uno general para bajar el contraste de la foto y otro
            en columna izquierda para que el titular tenga fondo limpio. */}
        <div className="absolute inset-0 bg-linear-to-b from-papel/45 via-papel/35 to-papel" />
        <div className="absolute inset-0 bg-linear-to-r from-papel/85 via-papel/40 to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-svh max-w-5xl flex-col justify-between px-6 py-10">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="dato text-tinta/70">
              {d.archivoFamiliar}
              <br />
              Sebi · Reykin
            </p>
            <SelectorIdioma lang={lang} className="mt-4" />
          </div>
          <Sello
            ciudad="Souk-Ahras"
            año={1930}
            size={116}
            className="shrink-0 -rotate-6"
          />
        </div>

        <div className="max-w-2xl py-12">
          <h1
            className="text-4xl leading-[1.15] font-semibold text-balance sm:text-5xl md:text-6xl"
            style={{ fontFamily: "var(--font-titular)" }}
          >
            {d.inicio.titularA}
            <span className="block text-oxido"> {d.inicio.titularB}</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-tinta/80">
            {d.inicio.entradilla}
          </p>
        </div>

        <div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {d.inicio.anticipo.map((s, i) => (
              <li key={ANCLAS[i]}>
                <a
                  href={ANCLAS[i]}
                  className="hoja group block h-full rounded-sm px-4 py-3.5 transition-transform duration-300 hover:-translate-y-1"
                >
                  <span className="dato text-oxido">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="mt-1 block text-lg"
                    style={{ fontFamily: "var(--font-titular)" }}
                  >
                    {s.t}
                  </span>
                  <span className="mt-1 block text-sm leading-snug text-tinta/65">
                    {s.d}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="dato mt-8 text-center text-tinta/45">
            {d.deslizaParaEmpezar}
          </p>
        </div>
      </div>
    </header>
  );
}
