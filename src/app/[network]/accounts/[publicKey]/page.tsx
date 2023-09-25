import { Metadata } from 'next'

import { AccountDetails } from '@/components/accounts/account-details'
import { AccountReportDialog } from '@/components/accounts/account-report-dialog'
import { AccountSuspiciousAlert } from '@/components/accounts/account-suspicious-alert'
import { AccountTransactions } from '@/components/accounts/account-transactions'
import { fetchAccount } from '@/data/accounts'
import { Network } from '@/data/api'
import { fetchRestrictions } from '@/data/restrictions'
import { getLocale, getT } from '@/lib/i18n/server'

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
  const locale = getLocale()
  const accountData = await fetchAccount({
    publicKey: params.publicKey,
    network: params.network as Network
  })
  const restrictions = await fetchRestrictions({
    publicKey: params.publicKey
  })
  return (
    <div className="flex flex-col gap-4 flex-1">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">{t('accounts.accountOverview')}</h1>
        <AccountReportDialog publicKey={accountData.publicKey} />
      </div>
      {restrictions.items.length > 0 && (
        <AccountSuspiciousAlert
          title={t('accounts.warning')}
          description={t('accounts.accountSuspicious')}
          reason={restrictions.items[0].reason}
        />
      )}
      <AccountDetails
        accountData={accountData}
        network={params.network}
        locale={locale}
      />
      <AccountTransactions publicKey={params.publicKey} />
    </div>
  )
}

export default AccountPage
