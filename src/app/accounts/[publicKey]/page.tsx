import { Metadata } from 'next'

import { AccountDetails } from '@/components/account-details'
import { fetchAccount } from '@/data/accounts'

export const metadata: Metadata = {
  title: 'Account - Minaverse'
}

const AccountPage = async ({ params }: { params: { publicKey: string } }) => {
  const accountData = await fetchAccount({ publicKey: params.publicKey })
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl">Account Overview</h1>
      {accountData && <AccountDetails accountData={accountData} />}
    </div>
  )
}

export default AccountPage
