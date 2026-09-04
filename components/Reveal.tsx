"use client";

import { useCallback, useState } from "react";

/**
 * Revela el contenido al entrar en pantalla, como quien pasa la página
 * de un cuaderno. Si el sistema pide movimiento reducido, no anima nada.
 *
 * Usa una ref de callback en vez de useEffect: así el observador se crea
 * justo cuando el nodo existe, y se limpia solo al desmontarse.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const [visible, setVisible] = useState(false);

  const observar = useCallback((nodo: HTMLDivElement | null) => {
    if (!nodo) return;

    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducido || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) {
            setVisible(true);
            observador.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    observador.observe(nodo);
    return () => observador.disconnect();
  }, []);

  return (
    <div
      ref={observar}
      className={`transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      } ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
