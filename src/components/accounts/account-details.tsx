import NextLink from 'next/link'

import { FieldGrid } from '@/components/field-grid'
import { ProxyAccount } from '@/data/accounts'
import { formatNumber } from '@/lib/number'

interface AccountDetailsProps {
  accountData: ProxyAccount
}

export const AccountDetails = ({ accountData }: AccountDetailsProps) => {
  const fields = [
    {
      label: 'Public Key',
      value: (
        <NextLink href={`/accounts/${accountData?.publicKey}`}>
          {accountData?.publicKey}
        </NextLink>
      ),
      testId: 'account__publicKey'
    },
    {
      label: 'Balance',
      value: `${formatNumber(
        Number(accountData?.balance.total) / 1_000_000_000
      )} MINA`,
      testId: 'account__balance'
    },
    { label: 'Nonce', value: accountData?.nonce, testId: 'account__nonce' },
    {
      label: 'Delegate',
      value: (
        <NextLink
          href={`/accounts/${accountData?.epochDelegateAccount?.publicKey}`}
        >
          {accountData?.epochDelegateAccount?.publicKey}
        </NextLink>
      ),
      testId: 'account__delegate'
    }
  ]
  return <FieldGrid fields={fields} />
}
