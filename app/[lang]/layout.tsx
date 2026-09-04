import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fraunces, Special_Elite } from "next/font/google";
import { IDIOMAS, ES_IDIOMA, dic, type Lang } from "@/lib/i18n";
import "../globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const elite = Special_Elite({
  variable: "--font-elite",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export function generateStaticParams() {
  return IDIOMAS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const d = dic(ES_IDIOMA(lang) ? lang : "es");
  return {
    title: d.tituloSitio,
    description: d.descripcionSitio,
    // El sitio contiene documentos personales y personas vivas: no se indexa.
    robots: { index: false, follow: false },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!ES_IDIOMA(lang)) notFound();

  const d = dic(lang as Lang);

  return (
    // Las variables de fuente van en <html> a propósito: los tokens del tema
    // (--font-titular) se declaran en :root y resuelven su var() ahí mismo, así
    // que si las fuentes se definieran en <body> quedarían fuera de alcance.
    <html lang={d.htmlLang} className={`${fraunces.variable} ${elite.variable}`}>
      <body className="antialiased">
        <a
          href="#origenes"
          className="dato sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-tinta focus:px-4 focus:py-2 focus:text-papel"
        >
          {d.saltarAlContenido}
        </a>
        {children}
      </body>
    </html>
  );
}
