import { appUrl } from '@/lib/url'

export enum Network {
  MAINNET = 'mainnet',
  DEVNET = 'devnet',
  BERKELEY = 'berkeley'
}

export const ExplorerUrl = {
  [Network.MAINNET]: appUrl(`/me`),
  [Network.DEVNET]: appUrl(`/devnet/me`),
  [Network.BERKELEY]: appUrl(`/berkeley/me`)
}

export const ExplorerApiUrl = {
  [Network.MAINNET]: appUrl(`/me/api`),
  [Network.DEVNET]: appUrl(`/devnet/me/api`),
  [Network.BERKELEY]: appUrl(`/berkeley/me/api`)
}

export const GqlUrl = {
  [Network.MAINNET]: appUrl(`/gql`),
  [Network.DEVNET]: appUrl(`/devnet/gql`),
  [Network.BERKELEY]: appUrl(`/berkeley/gql`)
}

export const ProxyUrl = {
  [Network.MAINNET]: appUrl(`/proxy`),
  [Network.DEVNET]: appUrl(`/devnet/proxy`),
  [Network.BERKELEY]: appUrl(`/berkeley/proxy`)
}

export type SearchResults = {
  found: boolean
  type?: 'account' | 'transaction'
  id?: string
}
