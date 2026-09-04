/**
 * El sello de matasellos: el elemento firma del sitio.
 * Se reutiliza en la portada, el mapa, la línea del tiempo y el árbol
 * como hilo conductor visual.
 */
export function Sello({
  ciudad,
  año,
  size = 132,
  tono = "oxido",
  className = "",
}: {
  ciudad: string;
  año: string | number;
  size?: number;
  tono?: "oxido" | "verde" | "tinta";
  className?: string;
}) {
  const color =
    tono === "verde" ? "#3D5A45" : tono === "tinta" ? "#1B2A4A" : "#8B3A2E";
  const r = 50;
  const id = `sello-${ciudad.replace(/\W/g, "")}-${año}`;

  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={`Sello: ${ciudad}, ${año}`}
      style={{ color }}
    >
      <defs>
        <path
          id={`${id}-arco`}
          d={`M 60,60 m -${r - 12},0 a ${r - 12},${r - 12} 0 1,1 ${(r - 12) * 2},0`}
          fill="none"
        />
        <path
          id={`${id}-arco-bajo`}
          d={`M 60,60 m -${r - 12},0 a ${r - 12},${r - 12} 0 0,0 ${(r - 12) * 2},0`}
          fill="none"
        />
      </defs>

      <g
        stroke="currentColor"
        fill="none"
        opacity="0.85"
        strokeLinecap="round"
      >
        <circle cx="60" cy="60" r={r} strokeWidth="2.5" />
        <circle cx="60" cy="60" r={r - 7} strokeWidth="1" opacity="0.6" />
        {/* Ondas del matasellos */}
        <path d="M 18 60 q 7 -5 14 0 t 14 0" strokeWidth="1.2" opacity="0.45" />
        <path d="M 74 60 q 7 -5 14 0 t 14 0" strokeWidth="1.2" opacity="0.45" />
      </g>

      <text
        fill="currentColor"
        fontFamily="var(--font-maquina)"
        fontSize="11"
        letterSpacing="2.4"
      >
        <textPath href={`#${id}-arco`} startOffset="50%" textAnchor="middle">
          {ciudad.toUpperCase()}
        </textPath>
      </text>

      <text
        fill="currentColor"
        fontFamily="var(--font-maquina)"
        fontSize="9"
        letterSpacing="3"
        opacity="0.75"
      >
        <textPath href={`#${id}-arco-bajo`} startOffset="50%" textAnchor="middle">
          · · ·
        </textPath>
      </text>

      <text
        x="60"
        y="66"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="var(--font-maquina)"
        fontSize="21"
        letterSpacing="1"
      >
        {año}
      </text>
    </svg>
  );
}
