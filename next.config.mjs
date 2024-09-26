/** @type {import('next').NextConfig} */
import Icons from 'unplugin-icons/webpack';

export default {
  reactStrictMode: true,
  webpack: (config, { isServer, dev }) => {
    if (dev) config.cache = false;
    config.plugins.push(
      Icons({
        compiler: 'jsx',
        jsx: 'react',
      })
    );
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.hostname.com',
        port: '',
      },
    ],
  },
  env: {
    EXAMPLE_URL: process.env.EXAMPLE_URL,
  },
};
