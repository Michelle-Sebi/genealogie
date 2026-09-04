"use client";

import { useEffect, useState } from "react";
import { dic, type Lang } from "@/lib/i18n";
import { SelectorIdioma } from "@/components/SelectorIdioma";

const IDS = [
  "origenes",
  "mapa",
  "tiempo",
  "arbol",
  "galeria",
  "tradiciones",
  "continuacion",
] as const;

export function Nav({ lang }: { lang: Lang }) {
  const [activa, setActiva] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const d = dic(lang);

  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) setActiva(entrada.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    for (const id of IDS) {
      const nodo = document.getElementById(id);
      if (nodo) observador.observe(nodo);
    }

    const alHacerScroll = () =>
      setVisible(window.scrollY > window.innerHeight * 0.7);
    alHacerScroll();
    window.addEventListener("scroll", alHacerScroll, { passive: true });

    return () => {
      observador.disconnect();
      window.removeEventListener("scroll", alHacerScroll);
    };
  }, []);

  return (
    <nav
      aria-label={d.nav.origenes}
      className={`fixed top-0 right-0 left-0 z-40 border-b border-tinta/10 bg-papel/85 backdrop-blur-sm transition-opacity duration-500 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center gap-2 px-4 py-2">
        <ul className="flex flex-1 gap-1 overflow-x-auto">
          {IDS.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={activa === id ? "true" : undefined}
                className={`dato block whitespace-nowrap px-3 py-1.5 transition-colors ${
                  activa === id ? "text-oxido" : "text-tinta/55 hover:text-tinta"
                }`}
              >
                {d.nav[id]}
              </a>
            </li>
          ))}
        </ul>
        <SelectorIdioma lang={lang} className="shrink-0" />
      </div>
    </nav>
  );
}
