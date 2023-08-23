import { useMemo } from 'react'

import { GraphqlTransaction } from '@/data/transactions'
import { formatDate } from '@/lib/date'
import { formatNumber } from '@/lib/number'

interface TransactionDetailsProps {
  transactionData: GraphqlTransaction
}

export const TransactionDetails = ({
  transactionData
}: TransactionDetailsProps) => {
  const fields = useMemo(
    () => [
      { label: 'Hash', value: transactionData?.hash },
      {
        label: 'From',
        value: transactionData?.from
      },
      { label: 'To', value: transactionData?.to },
      { label: 'Amount', value: formatNumber(transactionData?.amount || 0) },
      {
        label: 'Date',
        value: transactionData?.dateTime && formatDate(transactionData.dateTime)
      }
    ],
    [transactionData]
  )
  return (
    <div className="grid gap-4 py-4">
      {fields.map((field) => (
        <div className="grid grid-cols-5 items-center gap-8">
          <p className="text-right text-sm">{field.label}</p>
          <p className="col-span-4 break-all leading-8">{field.value}</p>
        </div>
      ))}
    </div>
  )
}
