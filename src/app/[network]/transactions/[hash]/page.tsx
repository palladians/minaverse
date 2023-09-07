import { Metadata } from 'next'

import { TransactionDetails } from '@/components/transactions/transaction-details'
import { Network } from '@/data/api'
import { fetchTransaction } from '@/data/transactions'
import { getT } from '@/lib/i18n/server'

export const generateMetadata = async ({
  params
}: {
  params: { hash: string; network: string }
}): Promise<Metadata> => {
  return {
    title: `${params.hash} - Minaverse`
  }
}

const TransactionPage = async ({
  params
}: {
  params: { hash: string; network: string }
}) => {
  const t = await getT()
  const transactionData = await fetchTransaction({
    hash: params.hash,
    network: params.network as Network
  })
  return (
    <div className="flex flex-1 flex-col gap-4">
      <h1 className="text-2xl">{t('transactions.transactionDetails')}</h1>
      {transactionData && (
        <TransactionDetails
          transactionData={transactionData}
          network={params.network}
        />
      )}
    </div>
  )
}

export default TransactionPage
