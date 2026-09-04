import Image from "next/image";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { Seccion } from "@/components/Seccion";
import { Inicio } from "@/components/sections/Inicio";
import { Mapa } from "@/components/sections/Mapa";
import { LineaTiempo } from "@/components/sections/LineaTiempo";
import { Arbol } from "@/components/sections/Arbol";
import { Galeria } from "@/components/sections/Galeria";
import { Tradiciones } from "@/components/sections/Tradiciones";
import { Continuacion } from "@/components/sections/Continuacion";
import { ES_IDIOMA, dic, IDIOMAS } from "@/lib/i18n";

export function generateStaticParams() {
  return IDIOMAS.map((lang) => ({ lang }));
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!ES_IDIOMA(lang)) notFound();

  const d = dic(lang);
  const s = d.secciones;
  const o = d.origenes;

  return (
    <>
      <Nav lang={lang} />
      <Inicio lang={lang} />

      <main>
        <Seccion
          id="origenes"
          numero={s.origenes.numero}
          titulo={s.origenes.titulo}
          entradilla={s.origenes.entradilla}
        >
          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-start">
            <Reveal className="space-y-5 text-lg leading-relaxed text-tinta/85">
              <p>{o.p1}</p>
              <p>
                {o.p2a}
                <strong className="font-normal text-oxido">{o.p2b}</strong>
                {o.p2c}
              </p>
              <p>{o.p3}</p>
              <p>
                {o.p4a}
                <strong className="font-normal">{o.p4b}</strong>
                {o.p4c}
              </p>
              <p className="border-l-2 border-oxido/50 pl-5 text-tinta/70 italic">
                {o.p5}
              </p>
            </Reveal>

            <Reveal delay={120}>
              <figure className="hoja rounded-sm p-3">
                <div className="relative h-96 w-full overflow-hidden rounded-sm">
                  <Image
                    src="/fotos/ana-coloreada.jpg"
                    alt={o.anaAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-top"
                  />
                </div>
                <figcaption className="px-1 pt-3">
                  <p
                    className="text-lg"
                    style={{ fontFamily: "var(--font-titular)" }}
                  >
                    {o.anaTitulo}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-tinta/70">
                    {o.anaTexto}
                  </p>
                  <p className="mt-3 border-l-2 border-oxido/40 pl-3 text-xs leading-relaxed text-tinta/55">
                    {o.anaAviso}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </Seccion>

        <Seccion
          id="mapa"
          numero={s.mapa.numero}
          titulo={s.mapa.titulo}
          entradilla={s.mapa.entradilla}
        >
          <Mapa lang={lang} />
        </Seccion>

        <Seccion
          id="tiempo"
          numero={s.tiempo.numero}
          titulo={s.tiempo.titulo}
          entradilla={s.tiempo.entradilla}
        >
          <LineaTiempo lang={lang} />
        </Seccion>

        <Seccion
          id="arbol"
          numero={s.arbol.numero}
          titulo={s.arbol.titulo}
          entradilla={s.arbol.entradilla}
        >
          <Arbol lang={lang} />
        </Seccion>

        <Seccion
          id="galeria"
          numero={s.galeria.numero}
          titulo={s.galeria.titulo}
          entradilla={s.galeria.entradilla}
        >
          <Galeria lang={lang} />
        </Seccion>

        <Seccion
          id="tradiciones"
          numero={s.tradiciones.numero}
          titulo={s.tradiciones.titulo}
          entradilla={s.tradiciones.entradilla}
        >
          <Tradiciones lang={lang} />
        </Seccion>

        <Seccion
          id="continuacion"
          numero={s.continuacion.numero}
          titulo={s.continuacion.titulo}
        >
          <Continuacion lang={lang} />
        </Seccion>
      </main>
    </>
  );
}
