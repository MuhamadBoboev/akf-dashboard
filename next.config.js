/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

/** @type {import('next').NextConfig} */

// Remove this if you're not using Fullcalendar features

module.exports = {
  trailingSlash: true,
  reactStrictMode: false,
  fastRefresh: true,
  swcMinify: true,
  images: {
    domains: ['api.climatefacility-tj.org'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.climatefacility-tj.org',
        port: '',
        pathname: '/storage/**',
      }
    ],
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }
}
