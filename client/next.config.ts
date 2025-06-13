import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    const API_DOMAIN = process.env.API_DOMAIN;
    console.log(`USING API_DOMAIN: ${API_DOMAIN}`);

    return [
      {
        source: '/api/:path*',
        destination: `${API_DOMAIN}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
