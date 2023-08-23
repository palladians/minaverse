import { env } from '@/env.mjs'

export enum Network {
  MAINNET = 'mainnet',
  DEVNET = 'devnet',
  BERKELEY = 'berkeley'
}

export const ExplorerUrl = {
  [Network.MAINNET]: env.NEXT_PUBLIC_MAINNET_EXPLORER_URL,
  [Network.DEVNET]: env.NEXT_PUBLIC_DEVNET_EXPLORER_URL,
  [Network.BERKELEY]: env.NEXT_PUBLIC_BERKELEY_EXPLORER_URL
}

export const ExplorerApiUrl = {
  [Network.MAINNET]: env.NEXT_PUBLIC_MAINNET_EXPLORER_API_URL,
  [Network.DEVNET]: env.NEXT_PUBLIC_DEVNET_EXPLORER_API_URL,
  [Network.BERKELEY]: env.NEXT_PUBLIC_BERKELEY_EXPLORER_API_URL
}

export const GqlUrl = {
  [Network.MAINNET]: env.NEXT_PUBLIC_MAINNET_GQL_URL,
  [Network.DEVNET]: env.NEXT_PUBLIC_DEVNET_GQL_URL,
  [Network.BERKELEY]: env.NEXT_PUBLIC_BERKELEY_GQL_URL
}

export const ProxyUrl = {
  [Network.MAINNET]: env.NEXT_PUBLIC_MAINNET_PROXY_URL,
  [Network.DEVNET]: env.NEXT_PUBLIC_DEVNET_PROXY_URL,
  [Network.BERKELEY]: env.NEXT_PUBLIC_BERKELEY_PROXY_URL
}
