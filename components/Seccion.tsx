import { Reveal } from "@/components/Reveal";

export function Seccion({
  id,
  numero,
  titulo,
  entradilla,
  children,
  className = "",
}: {
  id: string;
  numero: string;
  titulo: string;
  entradilla?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-16 border-t border-tinta/10 px-6 py-20 sm:py-28 ${className}`}
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="dato text-oxido">{numero}</p>
          <h2
            className="mt-2 text-3xl sm:text-4xl"
            style={{ fontFamily: "var(--font-titular)" }}
          >
            {titulo}
          </h2>
          {entradilla ? (
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-tinta/75">
              {entradilla}
            </p>
          ) : null}
        </Reveal>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
