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
}

export const fetchTransactions = async ({
  length,
  start
}: FetchTransactionsProps): Promise<TransactionsResponse> => {
  const transactionsUrl = new URL('https://minaexplorer.com/all-transactions')
  transactionsUrl.searchParams.set('length', String(length || 20))
  transactionsUrl.searchParams.set('start', String(start || 0))
  const transactionsRequest = await fetch(transactionsUrl)
  return transactionsRequest.json() as Promise<TransactionsResponse>
}
