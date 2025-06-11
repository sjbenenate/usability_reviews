import { configDotenv } from 'dotenv';

/** @type {import('next').NextConfig} */
configDotenv;
const nextConfig = {
  async rewrites() {
    const API_DOMAIN = process.env.API_DOMAIN;
    console.log(API_DOMAIN);

    return [
      {
        source: '/api/:path*',
        destination: `${API_DOMAIN}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
