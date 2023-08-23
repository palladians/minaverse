import { ExplorerUrl, Network } from '@/data/api'

export type Pool = {
  _id: {
    delegate: string
  }
  stake: number
  delegates: number
  name: string
  percentOfStake: string
  blockChance: string
}

export type StakingResponse = {
  draw: number
  recordsTotal: number
  recordsFiltered: number
  data: Pool[]
}

interface FetchStakingProps {
  length?: number
  start?: number
  search: string | null
  network: Network
}

export const fetchStaking = async ({
  length,
  start,
  search,
  network
}: FetchStakingProps): Promise<StakingResponse> => {
  const explorerUrl = ExplorerUrl[network]
  const accountsUrl = new URL(`${explorerUrl}/staking-data/current`)
  accountsUrl.searchParams.set('length', String(length || 20))
  accountsUrl.searchParams.set('start', String(start || 0))
  accountsUrl.searchParams.set('order[0][column]', '2')
  accountsUrl.searchParams.set('order[0][dir]', 'desc')
  if (search) {
    accountsUrl.searchParams.set('search[value]', search)
  }
  const accountsRequest = await fetch(accountsUrl)
  return accountsRequest.json() as Promise<StakingResponse>
}
