import { Metadata, NextPage } from 'next'

import { AccountsTable } from '@/components/accounts-table'
import { fetchAccounts } from '@/data/accounts'

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
  const accountsData = await fetchAccounts({
    length: PAGE_LENGTH,
    start,
    search
  })
  const pagesCount = Math.ceil(accountsData.recordsTotal / PAGE_LENGTH)
  return (
    <main className="flex-1 flex flex-col">
      <AccountsTable
        data={accountsData.data}
        accountsCount={accountsData.recordsTotal}
        currentPage={page}
        pagesCount={pagesCount}
        query={search}
      />
    </main>
  )
}

export default AccountsPage
