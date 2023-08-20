import { NextPage } from 'next'

import { TransactionsTable } from '@/components/transactions-table'
// import { AccountSheet } from '@/components/account-sheet'
import { fetchTransactions } from '@/data/transactions'

const PAGE_LENGTH = 20

interface TransactionsPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

const TransactionsPage: NextPage<TransactionsPageProps> = async ({
  searchParams
}) => {
  const page = Number(searchParams.page) || 0
  const start = page * PAGE_LENGTH
  const transactionsData = await fetchTransactions({
    length: PAGE_LENGTH,
    start
  })
  const pagesCount = Math.ceil(transactionsData.recordsTotal / PAGE_LENGTH)
  return (
    <main className="flex-1 flex flex-col">
      {/*<AccountSheet />*/}
      <TransactionsTable
        data={transactionsData.data}
        transactionsCount={transactionsData.recordsTotal}
        currentPage={page}
        pagesCount={pagesCount}
      />
    </main>
  )
}

export default TransactionsPage
