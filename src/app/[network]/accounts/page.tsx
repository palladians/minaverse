import { Metadata, NextPage } from 'next'
import React, { Suspense } from 'react'

import { AccountsTable } from '@/components/accounts/accounts-table'
import { SimpleSkeleton } from '@/components/simple-skeleton'
import { fetchAccounts } from '@/data/accounts'
import { Network } from '@/data/api'
import { getLocale, getT } from '@/lib/i18n/server'
import { titleTemplate } from '@/lib/metadata'

const PAGE_LENGTH = 20

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getT()
  return {
    title: titleTemplate(t('common.accounts'))
  }
}

interface AccountsPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
  params: { network: string }
}

const AccountsPage: NextPage<AccountsPageProps> = async ({
  searchParams,
  params
}) => {
  const locale = getLocale()
  const page = Number(searchParams.page) || 0
  const start = page * PAGE_LENGTH
  const search = searchParams.search ? String(searchParams.search) : null
  const accountsData = await fetchAccounts({
    length: PAGE_LENGTH,
    start,
    search,
    network: params.network as Network
  })
  const pagesCount = Math.ceil(accountsData.recordsTotal / PAGE_LENGTH)
  return (
    <main className="flex-1 flex flex-col">
      <Suspense fallback={<SimpleSkeleton />}>
        <AccountsTable
          data={accountsData.data}
          accountsCount={accountsData.recordsTotal}
          currentPage={page}
          pagesCount={pagesCount}
          query={search}
          network={params.network}
          locale={locale}
        />
      </Suspense>
    </main>
  )
}

export default AccountsPage
