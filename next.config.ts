import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // La raíz lleva al castellano; el francés está en /fr.
      { source: "/", destination: "/es", permanent: false },
    ];
  },
};

export default nextConfig;
