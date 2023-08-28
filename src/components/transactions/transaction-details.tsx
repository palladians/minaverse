import NextLink from 'next/link'

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
  const fields = [
    {
      label: 'Hash',
      value: (
        <NextLink href={`/transactions/${transactionData?.hash}`}>
          {transactionData?.hash}
        </NextLink>
      ),
      testId: 'transaction__hash'
    },
    {
      label: 'Kind',
      value: transactionData?.kind,
      testId: 'transaction__side'
    },
    {
      label: 'From',
      value: (
        <NextLink href={`/accounts/${transactionData?.from}`}>
          {transactionData?.from}
        </NextLink>
      ),
      testId: 'transaction__from'
    },
    {
      label: 'To',
      value: (
        <NextLink href={`/accounts/${transactionData?.to}`}>
          {transactionData?.to}
        </NextLink>
      ),
      testId: 'transaction__to'
    },
    {
      label: 'Amount',
      value: `${formatNumber(
        Number(transactionData?.amount) / 1_000_000_000
      )} MINA`,
      testId: 'transaction__amount'
    },
    {
      label: 'Date',
      value: transactionData?.dateTime && formatDate(transactionData.dateTime),
      testId: 'transaction__date'
    }
  ]
  return <FieldGrid fields={fields} />
}
