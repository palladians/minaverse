import { ExplorerUrl, Network } from '@/data/api'

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
  network: Network
}

interface FetchAccountProps {
  publicKey: string
  network: Network
}

export const fetchAccounts = async ({
  length,
  start,
  search,
  network
}: FetchAccountsProps): Promise<AccountsResponse> => {
  const explorerUrl = ExplorerUrl[network]
  const accountsUrl = new URL(`${explorerUrl}/all-accounts`)
  accountsUrl.searchParams.set('length', String(length || 20))
  accountsUrl.searchParams.set('start', String(start || 0))
  if (search) {
    accountsUrl.searchParams.set('search[value]', search)
  }
  const accountsRequest = await fetch(accountsUrl)
  return accountsRequest.json() as Promise<AccountsResponse>
}

export const fetchAccount = async ({ publicKey }: FetchAccountProps) => {
  const request = await fetch(`/api/accounts/${publicKey}`)
  const response = (await request.json()) as ProxyAccountResponse
  return response.account
}
