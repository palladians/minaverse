import { gql, request } from 'graphql-request'

import { env } from '@/env.mjs'

const transactionQuery = gql`
  query Transaction($hash: String!) {
    transaction(query: { hash: $hash }) {
      hash
      amount
      blockHeight
      canonical
      dateTime
      fee
      from
      to
      isDelegation
      kind
      memo
      nonce
      token
      failureReason
    }
  }
`

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
  search
}: FetchTransactionsProps): Promise<TransactionsResponse> => {
  const transactionsUrl = new URL('https://minaexplorer.com/all-transactions')
  transactionsUrl.searchParams.set('length', String(length || 20))
  transactionsUrl.searchParams.set('start', String(start || 0))
  if (search) {
    transactionsUrl.searchParams.set('search[value]', search)
  }
  console.log('>>>URL', transactionsUrl)
  const transactionsRequest = await fetch(transactionsUrl)
  return transactionsRequest.json() as Promise<TransactionsResponse>
}

export const fetchTransaction = async ({ hash }: { hash: string }) => {
  const response = (await request(
    env.NEXT_PUBLIC_MAINNET_GQL_URL,
    transactionQuery,
    { hash }
  )) as TransactionResponse
  return response.transaction
}
