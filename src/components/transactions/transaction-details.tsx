import { useMemo } from 'react'

import { FieldGrid } from '@/components/field-grid'
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
      {
        label: 'Hash',
        value: transactionData?.hash,
        testId: 'transaction__hash'
      },
      {
        label: 'From',
        value: transactionData?.from,
        testId: 'transaction__from'
      },
      { label: 'To', value: transactionData?.to, testId: 'transaction__to' },
      {
        label: 'Amount',
        value: `${formatNumber(
          Number(transactionData?.amount) / 1_000_000_000
        )} MINA`,
        testId: 'transaction__amount'
      },
      {
        label: 'Date',
        value:
          transactionData?.dateTime && formatDate(transactionData.dateTime),
        testId: 'transaction__date'
      }
    ],
    [transactionData]
  )
  return <FieldGrid fields={fields} />
}
