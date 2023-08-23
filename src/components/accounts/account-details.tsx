import { useMemo } from 'react'

import { ProxyAccount } from '@/data/accounts'
import { formatNumber } from '@/lib/number'

interface AccountDetailsProps {
  accountData: ProxyAccount
}

export const AccountDetails = ({ accountData }: AccountDetailsProps) => {
  const fields = useMemo(
    () => [
      { label: 'Public Key', value: accountData?.publicKey },
      {
        label: 'Balance',
        value: formatNumber(Number(accountData?.balance.total))
      },
      { label: 'Nonce', value: accountData?.nonce },
      { label: 'Delegate', value: accountData?.epochDelegateAccount.publicKey }
    ],
    [accountData]
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
