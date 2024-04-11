/** @type {import('next').NextConfig} */
const appConfig = require('./app.config')

const nextConfig = {
  reactStrictMode: false,
  env: {
    API_URL: appConfig.API_URL,
    CHAT_URL: appConfig.CHAT_URL,
    STORAGE_URL: appConfig.STORAGE_URL,
    STORAGE_HOST: appConfig.STORAGE_HOST,
    SOCKET_URL: process.env.SOCKET_URL,
    COOKIE_AUTH_TOKEN: '_a',
    COOKIE_ACCESS_TOKEN: '_t',
    COOKIE_REFRESH_TOKEN: '_r',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: appConfig.STORAGE_HOST,
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: appConfig.STORAGE_HOST,
        pathname: '**',
      },
    ],
  },
}

module.exports = nextConfig
