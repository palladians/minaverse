'use client'

import NextLink from 'next/link'

import { FieldGrid } from '@/components/field-grid'
import { GraphqlTransaction } from '@/data/transactions'
import { formatDate } from '@/lib/date'
import { useTranslation } from '@/lib/i18n/client'
import { formatNumber } from '@/lib/number'
import { AppUrls } from '@/lib/url'
import { useAppStore } from '@/store/app'

interface TransactionDetailsProps {
  transactionData: GraphqlTransaction
  network: string
}

export const TransactionDetails = ({
  transactionData,
  network
}: TransactionDetailsProps) => {
  const { t } = useTranslation()
  const locale = useAppStore((state) => state.locale) || 'en'
  const fields = [
    {
      label: t('common.hash'),
      value: (
        <NextLink
          href={AppUrls.transaction({ network, id: transactionData?.hash })}
        >
          {transactionData?.hash}
        </NextLink>
      ),
      testId: 'transaction__hash'
    },
    {
      label: t('common.kind'),
      value: transactionData?.kind,
      testId: 'transaction__side'
    },
    {
      label: t('common.from'),
      value: (
        <NextLink
          href={AppUrls.account({ network, id: transactionData?.from })}
        >
          {transactionData?.from}
        </NextLink>
      ),
      testId: 'transaction__from'
    },
    {
      label: t('common.to'),
      value: (
        <NextLink href={AppUrls.account({ network, id: transactionData?.to })}>
          {transactionData?.to}
        </NextLink>
      ),
      testId: 'transaction__to'
    },
    {
      label: t('common.amount'),
      value: `${formatNumber({
        value: Number(transactionData?.amount) / 1_000_000_000,
        locale
      })} MINA`,
      testId: 'transaction__amount'
    },
    {
      label: t('common.date'),
      value:
        transactionData?.dateTime &&
        locale &&
        formatDate({ date: transactionData.dateTime, locale }),
      testId: 'transaction__date'
    }
  ]
  return <FieldGrid fields={fields} />
}
