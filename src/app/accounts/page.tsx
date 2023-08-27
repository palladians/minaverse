import { Metadata, NextPage } from 'next'
import React, { Suspense } from 'react'

import { AccountsTable } from '@/components/accounts/accounts-table'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchAccounts } from '@/data/accounts'
import { getNetwork } from '@/data/network'

const PAGE_LENGTH = 20

export const metadata: Metadata = {
  title: 'Accounts - Minaverse'
}

interface AccountsPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

const AccountsPage: NextPage<AccountsPageProps> = async ({ searchParams }) => {
  const page = Number(searchParams.page) || 0
  const start = page * PAGE_LENGTH
  const search = searchParams.search ? String(searchParams.search) : null
  const network = getNetwork()
  const accountsData = await fetchAccounts({
    length: PAGE_LENGTH,
    start,
    search,
    network
  })
  const pagesCount = Math.ceil(accountsData.recordsTotal / PAGE_LENGTH)
  return (
    <main className="flex-1 flex flex-col">
      <Suspense fallback={<Skeleton className="w-full h-4" />}>
        <AccountsTable
          data={accountsData.data}
          accountsCount={accountsData.recordsTotal}
          currentPage={page}
          pagesCount={pagesCount}
          query={search}
        />
      </Suspense>
    </main>
  )
}

export default AccountsPage
