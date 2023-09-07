import { Metadata, NextPage } from 'next'
import React, { Suspense } from 'react'

import { SimpleSkeleton } from '@/components/simple-skeleton'
import { StakingTable } from '@/components/staking/staking-table'
import { Network } from '@/data/api'
import { fetchStaking } from '@/data/staking'
import { getLocale, getT } from '@/lib/i18n/server'
import { titleTemplate } from '@/lib/metadata'

const PAGE_LENGTH = 20

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getT()
  return {
    title: titleTemplate(t('common.staking'))
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
  const stakingData = await fetchStaking({
    length: PAGE_LENGTH,
    start,
    search,
    network: params.network as Network
  })
  const pools = stakingData.data.map((pool) => ({
    ...pool,
    publicKey: pool._id.delegate
  }))
  const pagesCount = Math.ceil(stakingData.recordsTotal / PAGE_LENGTH)
  return (
    <main className="flex-1 flex flex-col">
      <Suspense fallback={<SimpleSkeleton />}>
        <StakingTable
          data={pools}
          poolsCount={stakingData.recordsTotal}
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
