import { Metadata } from 'next'

import { AccountDetails } from '@/components/accounts/account-details'
import { AccountTransactions } from '@/components/accounts/account-transactions'
import { fetchAccount } from '@/data/accounts'
import { getNetwork } from '@/data/network'

export const metadata: Metadata = {
  title: 'Account - Minaverse'
}

const AccountPage = async ({ params }: { params: { publicKey: string } }) => {
  const network = getNetwork()
  const accountData = await fetchAccount({
    publicKey: params.publicKey,
    network
  })
  return (
    <div className="flex flex-col gap-4 flex-1">
      <h1 className="text-2xl">Account Overview</h1>
      <AccountDetails accountData={accountData} />
      <AccountTransactions publicKey={params.publicKey} />
    </div>
  )
}

export default AccountPage
