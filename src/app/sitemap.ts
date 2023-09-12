import { MetadataRoute } from 'next'

import { fetchAccounts } from '@/data/accounts'
import { Network } from '@/data/api'
import { fetchStaking } from '@/data/staking'
import { env } from '@/env.mjs'

const APP_URL = env.NEXT_PUBLIC_APP_URL

const networks = [Network.MAINNET, Network.DEVNET, Network.BERKELEY]

const getAccountsRoutes = ({
  network,
  accountIds
}: {
  network: Network
  accountIds: string[]
}) =>
  accountIds.map((id) => ({
    url: `${APP_URL}/${network}/accounts/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8
  }))

const getNetworkRoutes = async (network: Network) => {
  const { data: stakePools } = await fetchStaking({ search: null, network })
  const { data: accounts } = await fetchAccounts({ search: null, network })
  return [
    {
      url: `${APP_URL}/${network}/accounts`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8
    },
    ...getAccountsRoutes({
      accountIds: accounts.map(({ public_key }) => public_key),
      network
    }),
    {
      url: `${APP_URL}/${network}/transactions`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${APP_URL}/${network}/staking`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8
    },
    ...getAccountsRoutes({
      accountIds: stakePools.map(({ _id }) => _id.delegate),
      network
    })
  ]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = (await Promise.all(
    networks.map(async (network) => await getNetworkRoutes(network))
  )) as MetadataRoute.Sitemap[]

  return [
    {
      url: APP_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1
    },
    ...routes.flat()
  ]
}
