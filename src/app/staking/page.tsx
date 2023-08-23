import { Metadata, NextPage } from 'next'

import { StakingTable } from '@/components/staking/staking-table'
import { getNetwork } from '@/data/network'
import { fetchStaking } from '@/data/staking'

const PAGE_LENGTH = 20

export const metadata: Metadata = {
  title: 'Staking - Minaverse'
}

interface AccountsPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

const AccountsPage: NextPage<AccountsPageProps> = async ({ searchParams }) => {
  const page = Number(searchParams.page) || 0
  const start = page * PAGE_LENGTH
  const search = searchParams.search ? String(searchParams.search) : null
  const network = getNetwork()
  const stakingData = await fetchStaking({
    length: PAGE_LENGTH,
    start,
    search,
    network
  })
  const pools = stakingData.data.map((pool) => ({
    ...pool,
    publicKey: pool._id.delegate
  }))
  const pagesCount = Math.ceil(stakingData.recordsTotal / PAGE_LENGTH)
  return (
    <main className="flex-1 flex flex-col">
      <StakingTable
        data={pools}
        poolsCount={stakingData.recordsTotal}
        currentPage={page}
        pagesCount={pagesCount}
        query={search}
      />
    </main>
  )
}

export default AccountsPage
