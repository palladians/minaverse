import { Metadata, NextPage } from 'next'
import React, { Suspense } from 'react'

import { SimpleSkeleton } from '@/components/simple-skeleton'
import { TransactionsTable } from '@/components/transactions/transactions-table'
import { Network } from '@/data/api'
import { fetchTransactions } from '@/data/transactions'
import { getLocale, getT } from '@/lib/i18n/server'
import { titleTemplate } from '@/lib/metadata'

const PAGE_LENGTH = 20

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getT()
  return {
    title: titleTemplate(t('common.transactions'))
  }
}

interface TransactionsPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
  params: { network: string }
}

const TransactionsPage: NextPage<TransactionsPageProps> = async ({
  searchParams,
  params
}) => {
  const locale = getLocale()
  const page = Number(searchParams.page) || 0
  const start = page * PAGE_LENGTH
  const search = searchParams.search ? String(searchParams.search) : null
  const transactionsData = await fetchTransactions({
    length: PAGE_LENGTH,
    start,
    search,
    network: params.network as Network
  })
  const pagesCount = Math.ceil(transactionsData.recordsTotal / PAGE_LENGTH)
  return (
    <main className="flex-1 flex flex-col">
      <Suspense fallback={<SimpleSkeleton />}>
        <TransactionsTable
          data={transactionsData.data}
          transactionsCount={transactionsData.recordsTotal}
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

export default TransactionsPage
