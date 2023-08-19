import { NextPage } from 'next'

import { AccountSheet } from '@/components/account-sheet'
import { AccountsTable } from '@/components/accounts-table'
import { fetchAccounts } from '@/data/accounts'

const PAGE_LENGTH = 20

interface AccountsPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

const AccountsPage: NextPage<AccountsPageProps> = async ({ searchParams }) => {
  const page = Number(searchParams.page) || 0
  const start = page * PAGE_LENGTH
  const accountsData = await fetchAccounts({ length: PAGE_LENGTH, start })
  const pagesCount = Math.ceil(accountsData.recordsTotal / PAGE_LENGTH)
  return (
    <main className="flex-1 flex flex-col">
      <AccountSheet />
      <AccountsTable
        data={accountsData.data}
        accountsCount={accountsData.recordsTotal}
        currentPage={page}
        pagesCount={pagesCount}
      />
    </main>
  )
}

export default AccountsPage
