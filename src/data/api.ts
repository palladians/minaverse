import { env } from '@/env.mjs'

export enum Network {
  MAINNET = 'mainnet',
  DEVNET = 'devnet',
  BERKELEY = 'berkeley'
}

export const ExplorerUrl = {
  [Network.MAINNET]: `${env.NEXT_PUBLIC_APP_URL}/me`,
  [Network.DEVNET]: `${env.NEXT_PUBLIC_APP_URL}/devnet/me`,
  [Network.BERKELEY]: `${env.NEXT_PUBLIC_APP_URL}/berkeley/me`
}

export const ExplorerApiUrl = {
  [Network.MAINNET]: `${env.NEXT_PUBLIC_APP_URL}/me/api`,
  [Network.DEVNET]: `${env.NEXT_PUBLIC_APP_URL}/devnet/me/api`,
  [Network.BERKELEY]: `${env.NEXT_PUBLIC_APP_URL}/berkeley/me/api`
}

export const GqlUrl = {
  [Network.MAINNET]: `${env.NEXT_PUBLIC_APP_URL}/gql`,
  [Network.DEVNET]: `${env.NEXT_PUBLIC_APP_URL}/devnet/gql`,
  [Network.BERKELEY]: `${env.NEXT_PUBLIC_APP_URL}/berkeley/gql`
}

export const ProxyUrl = {
  [Network.MAINNET]: `${env.NEXT_PUBLIC_APP_URL}/proxy`,
  [Network.DEVNET]: `${env.NEXT_PUBLIC_APP_URL}/devnet/proxy`,
  [Network.BERKELEY]: `${env.NEXT_PUBLIC_APP_URL}/berkeley/proxy`
}
