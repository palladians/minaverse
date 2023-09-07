'use client'

import NextLink from 'next/link'

import { FieldGrid } from '@/components/field-grid'
import { ProxyAccount } from '@/data/accounts'
import { useTranslation } from '@/lib/i18n/client'
import { formatNumber } from '@/lib/number'
import { AppUrls } from '@/lib/url'

interface AccountDetailsProps {
  accountData: ProxyAccount
  network: string
  locale: string
}

export const AccountDetails = ({
  accountData,
  network,
  locale
}: AccountDetailsProps) => {
  const { t } = useTranslation()
  const fields = [
    {
      label: t('common.publicKey'),
      value: (
        <NextLink
          href={AppUrls.account({ network, id: accountData?.publicKey })}
        >
          {accountData?.publicKey}
        </NextLink>
      ),
      testId: 'account__publicKey'
    },
    {
      label: t('common.balance'),
      value: `${formatNumber({
        value: Number(accountData?.balance.total) / 1_000_000_000,
        locale
      })} MINA`,
      testId: 'account__balance'
    },
    {
      label: t('common.nonce'),
      value: accountData?.nonce,
      testId: 'account__nonce'
    },
    {
      label: t('common.delegate'),
      value: (
        <NextLink
          href={AppUrls.account({
            network,
            id: accountData?.epochDelegateAccount?.publicKey
          })}
        >
          {accountData?.epochDelegateAccount?.publicKey}
        </NextLink>
      ),
      testId: 'account__delegate'
    }
  ]
  return <FieldGrid fields={fields} />
}
