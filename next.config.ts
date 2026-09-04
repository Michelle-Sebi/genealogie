import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // El sitio se publica como ficheros estáticos: no hay Node en el servidor.
  // `next build` deja el resultado en out/, listo para subir a httpdocs.
  output: "export",

  // Sin esto el export genera es.html en vez de es/index.html, y las URLs
  // pasarían a ser /es.html. Con barra final, Apache sirve /es/ tal cual.
  trailingSlash: true,

  // El optimizador de imágenes necesita servidor. Las fotos ya vienen
  // recortadas y pesan 2,2 MB entre todas, así que se sirven tal cual.
  images: { unoptimized: true },

  // El redirect de / a /es lo hace Apache: ver public/.htaccess.
  // `output: "export"` no admite redirects().
};

export default nextConfig;
