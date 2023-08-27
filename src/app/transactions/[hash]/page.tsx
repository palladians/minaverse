import { Metadata } from 'next'

import { TransactionDetails } from '@/components/transactions/transaction-details'
import { getNetwork } from '@/data/network'
import { fetchTransaction } from '@/data/transactions'

export const generateMetadata = async ({
  params
}: {
  params: { hash: string }
}): Promise<Metadata> => {
  return {
    title: `${params.hash} - Minaverse`
  }
}

const TransactionPage = async ({ params }: { params: { hash: string } }) => {
  const network = getNetwork()
  const transactionData = await fetchTransaction({ hash: params.hash, network })
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
