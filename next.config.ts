import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**', // Esto permite cualquier imagen de tu cuenta de Cloudinary
        
      },
    ],
  },
};

export default nextConfig;