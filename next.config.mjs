import './src/env.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/accounts/:path*',
        destination: '/mainnet/accounts/:path*',
        permanent: true,
      },
      {
        source: '/staking/:path*',
        destination: '/mainnet/staking/:path*',
        permanent: true,
      },
      {
        source: '/transactions/:path*',
        destination: '/mainnet/transactions/:path*',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/devnet/me/:path*',
        destination: 'https://devnet.minaexplorer.com/:path*'
      },
      {
        source: '/devnet/me/api/:path*',
        destination: 'https://devnet.api.minaexplorer.com/:path*'
      },
      {
        source: '/devnet/gql/:path*',
        destination: 'https://devnet.graphql.minaexplorer.com/:path*'
      },
      {
        source: '/devnet/proxy/:path*',
        destination: 'https://proxy.devnet.minaexplorer.com/:path*'
      },
      {
        source: '/berkeley/me/:path*',
        destination: 'https://berkeley.minaexplorer.com/:path*'
      },
      {
        source: '/berkeley/me/api/:path*',
        destination: 'https://berkeley.api.minaexplorer.com/:path*'
      },
      {
        source: '/berkeley/gql/:path*',
        destination: 'https://berkeley.graphql.minaexplorer.com/:path*'
      },
      {
        source: '/berkeley/proxy/:path*',
        destination: 'https://proxy.berkeley.minaexplorer.com/:path*'
      },
      {
        source: '/me/api/:path*',
        destination: 'https://api.minaexplorer.com/:path*'
      },
      {
        source: '/me/:path*',
        destination: 'https://minaexplorer.com/:path*'
      },
      {
        source: '/gql/:path*',
        destination: 'https://graphql.minaexplorer.com/:path*'
      },
      {
        source: '/proxy/:path*',
        destination: 'https://proxy.minaexplorer.com/:path*'
      }
    ]
  }
}

export default nextConfig
