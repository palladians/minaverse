import { Metadata, NextPage } from 'next'

import { TransactionsTable } from '@/components/transactions/transactions-table'
import { getNetwork } from '@/data/network'
import { fetchTransactions } from '@/data/transactions'

const PAGE_LENGTH = 20

export const metadata: Metadata = {
  title: 'Transactions - Minaverse'
}

interface TransactionsPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

const TransactionsPage: NextPage<TransactionsPageProps> = async ({
  searchParams
}) => {
  const page = Number(searchParams.page) || 0
  const start = page * PAGE_LENGTH
  const search = searchParams.search ? String(searchParams.search) : null
  const network = getNetwork()
  const transactionsData = await fetchTransactions({
    length: PAGE_LENGTH,
    start,
    search,
    network
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
        query={search}
      />
    </main>
  )
}

export default TransactionsPage
