import { Metadata } from 'next'

import { AccountDetails } from '@/components/accounts/account-details'
import { AccountTransactions } from '@/components/accounts/account-transactions'
import { fetchAccount } from '@/data/accounts'
import { Network } from '@/data/api'
import { getT } from '@/lib/i18n/server'

export const generateMetadata = async ({
  params
}: {
  params: { publicKey: string }
}): Promise<Metadata> => {
  return {
    title: `${params.publicKey} - Minaverse`
  }
}

const AccountPage = async ({
  params
}: {
  params: { publicKey: string; network: string }
}) => {
  const t = await getT()
  const accountData = await fetchAccount({
    publicKey: params.publicKey,
    network: params.network as Network
  })
  return (
    <div className="flex flex-col gap-4 flex-1">
      <h1 className="text-2xl">{t('accounts.accountOverview')}</h1>
      <AccountDetails accountData={accountData} network={params.network} />
      <AccountTransactions publicKey={params.publicKey} />
    </div>
  )
}

export default AccountPage
