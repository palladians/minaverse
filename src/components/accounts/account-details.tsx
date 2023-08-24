import { useMemo } from 'react'

import { FieldGrid } from '@/components/field-grid'
import { ProxyAccount } from '@/data/accounts'
import { formatNumber } from '@/lib/number'

interface AccountDetailsProps {
  accountData: ProxyAccount
}

export const AccountDetails = ({ accountData }: AccountDetailsProps) => {
  const fields = useMemo(
    () => [
      {
        label: 'Public Key',
        value: accountData?.publicKey,
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
        value: accountData?.epochDelegateAccount.publicKey,
        testId: 'account__delegate'
      }
    ],
    [accountData]
  )
  return <FieldGrid fields={fields} />
}
