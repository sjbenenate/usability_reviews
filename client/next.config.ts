import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    const API_DOMAIN = process.env.API_DOMAIN;
    console.log(`USING API_DOMAIN: ${API_DOMAIN}`);

    return [
      {
        // This applies to client side components only, server components use the environment variable directly
        source: '/api/:path*',
        destination: `${API_DOMAIN}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
