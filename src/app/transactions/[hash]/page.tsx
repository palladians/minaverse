import { Metadata } from 'next'

import { TransactionDetails } from '@/components/transaction-details'
import { fetchTransaction } from '@/data/transactions'

export const metadata: Metadata = {
  title: 'Transaction - Minaverse'
}

const TransactionPage = async ({ params }: { params: { hash: string } }) => {
  const transactionData = await fetchTransaction({ hash: params.hash })
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl">Transaction Details</h1>
      {transactionData && (
        <TransactionDetails transactionData={transactionData} />
      )}
    </div>
  )
}

export default TransactionPage
