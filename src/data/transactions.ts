import { ExplorerUrl, Network } from '@/data/api'
import { env } from '@/env.mjs'

export type Transaction = {
  amount: number
  fee: number
  feeToken: number
  feePayer: {
    publicKey: string
    token: number
  }
  from: string
  fromAccount: {
    publicKey: string
    token: number
  }
  hash: string
  id: string
  isDelegation: boolean
  kind: 'PAYMENT' | 'STAKE_DELEGATION'
  memo: string
  nonce: number
  receiver: {
    publicKey: string
  }
  source: {
    publicKey: string
  }
  to: string
  toAccount: {
    publicKey: string
    token: number
  }
  token: number
  dateTime: number
  blockStateHash: string
  blockHeight: number
  canonical: boolean
  fromUserName: string
  toUserName: string
}

export type TransactionsResponse = {
  draw: number
  recordsTotal: number
  recordsFiltered: number
  data: Transaction[]
}

interface FetchTransactionsProps {
  length?: number
  start?: number
  search: string | null
  network: Network
}

interface FetchTransactionProps {
  hash: string
  network: Network
}

export type GraphqlTransaction = {
  amount: number
  blockHeight: number
  canonical: boolean
  dateTime: string
  failureReason: string | null
  fee: number
  from: string
  hash: string
  isDelegation: boolean
  kind: string
  memo: string
  nonce: number
  to: string
  token: number
}

export type TransactionResponse = {
  transaction: GraphqlTransaction
}

export const fetchTransactions = async ({
  length,
  start,
  search,
  network
}: FetchTransactionsProps): Promise<TransactionsResponse> => {
  const explorerUrl = ExplorerUrl[network]
  const transactionsUrl = new URL(`${explorerUrl}/all-transactions`)
  transactionsUrl.searchParams.set('length', String(length || 20))
  transactionsUrl.searchParams.set('start', String(start || 0))
  transactionsUrl.searchParams.set('columns[0][data]', 'dateTime')
  transactionsUrl.searchParams.set('columns[0][orderable]', 'true')
  if (search) {
    transactionsUrl.searchParams.set('search[value]', search)
  }
  const transactionsRequest = await fetch(transactionsUrl)
  return transactionsRequest.json() as Promise<TransactionsResponse>
}

export const fetchTransaction = async ({
  hash,
  network
}: FetchTransactionProps) => {
  const request = await fetch(
    `${env.NEXT_PUBLIC_APP_URL}/api/transaction/${hash}`,
    { headers: { 'minaverse-network': network } }
  )
  const response = (await request.json()) as TransactionResponse
  return response.transaction
}
