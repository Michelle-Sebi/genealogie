"use client";

import { usePathname, useRouter } from "next/navigation";
import { IDIOMAS, dic, type Lang } from "@/lib/i18n";

/**
 * Cambia de idioma conservando la sección en la que estás: reescribe el primer
 * segmento de la ruta y arrastra el ancla actual, de modo que quien esté
 * leyendo la galería en español siga en la galería al pasar a francés.
 */
export function SelectorIdioma({
  lang,
  className = "",
}: {
  lang: Lang;
  className?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const otro = IDIOMAS.find((l) => l !== lang) ?? "es";
  const base = pathname.replace(/^\/[^/]+/, `/${otro}`);
  const d = dic(lang);

  return (
    <a
      href={base}
      hrefLang={otro}
      title={d.cambiarIdioma}
      onClick={(e) => {
        e.preventDefault();
        router.push(base + window.location.hash);
      }}
      className={`dato inline-flex items-center gap-1.5 rounded-sm border border-tinta/25 px-2.5 py-1.5 text-tinta/70 transition-colors hover:border-tinta/60 hover:text-tinta ${className}`}
    >
      <span aria-hidden>◑</span>
      <span>{d.otroIdioma}</span>
    </a>
  );
}
