import { ExplorerUrl, Network } from '@/data/api'
import { appUrl } from '@/lib/url'

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

export type TransactionShort = {
  amount: number
  blockHeight: number
  dateTime: string
  failureReason: null | string
  fee: number
  from: string
  hash: string
  isDelegation: boolean
  kind: string
  to: string
  token: number
}

export type ProxyAccount = {
  balance: {
    total: string
  }
  publicKey: string
  totalTx: number
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

export type AccountTransactionsResponse = {
  transactions: TransactionShort[]
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
  network: string
}

interface FetchAccountTransactionsProps {
  publicKey: string
  limit?: number
  network: string
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

export const fetchAccount = async ({
  publicKey,
  network
}: FetchAccountProps) => {
  const request = await fetch(appUrl(`/api/account/${publicKey}`), {
    headers: { 'minaverse-network': network }
  })
  const response = (await request.json()) as ProxyAccountResponse
  return response.account
}

export const fetchAccountTransactions = async ({
  publicKey,
  limit = 100,
  network
}: FetchAccountTransactionsProps) => {
  const request = await fetch(
    appUrl(`/api/transactions/${publicKey}?limit=${String(limit)}`),
    { headers: { 'minaverse-network': network } }
  )
  const response = (await request.json()) as AccountTransactionsResponse
  return response.transactions
}
