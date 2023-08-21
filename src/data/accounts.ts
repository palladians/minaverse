import { gql, request } from 'graphql-request'

import { env } from '@/env.mjs'

const accountQuery = gql`
  query Account($publicKey: PublicKey!) {
    account(publicKey: $publicKey) {
      balance {
        total
      }
      publicKey
      token
      nonce
      stakingActive
      epochDelegateAccount {
        publicKey
      }
    }
  }
`

export type AccountShort = {
  pk: string
  balance: number
  delegate: string
  token: number
  nonce: number
  receipt_chain_hash: string
  voting_for: string
  public_key: string
  username: string
}

export type ProxyAccount = {
  balance: {
    total: string
  }
  publicKey: string
  token: string
  nonce: string
  stakingActive: boolean
  epochDelegateAccount: {
    publicKey: string
  }
}

export type ProxyAccountResponse = {
  account: ProxyAccount
}

export type AccountsResponse = {
  draw: number
  recordsTotal: number
  recordsFiltered: number
  data: AccountShort[]
}

interface FetchAccountsProps {
  length?: number
  start?: number
  search: string | null
}

export const fetchAccounts = async ({
  length,
  start,
  search
}: FetchAccountsProps): Promise<AccountsResponse> => {
  const accountsUrl = new URL('https://minaexplorer.com/all-accounts')
  accountsUrl.searchParams.set('length', String(length || 20))
  accountsUrl.searchParams.set('start', String(start || 0))
  if (search) {
    accountsUrl.searchParams.set('search[value]', search)
  }
  const accountsRequest = await fetch(accountsUrl)
  return accountsRequest.json() as Promise<AccountsResponse>
}

export const fetchAccount = async ({ publicKey }: { publicKey: string }) => {
  const response = (await request(
    env.NEXT_PUBLIC_MAINNET_PROXY_URL,
    accountQuery,
    { publicKey }
  )) as ProxyAccountResponse
  return response.account
}
