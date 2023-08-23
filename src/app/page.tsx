import { Metadata } from 'next'

import { QuickStats } from '@/components/dashboard/quick-stats'
import { SummaryOverview } from '@/components/dashboard/summary-overview'
import { fetchCoinData } from '@/data/coin'

export const metadata: Metadata = {
  title: 'The universe of Mina Protocol - Minaverse'
}

const HomePage = async () => {
  const coinData = await fetchCoinData()
  return (
    <main className="flex-1 flex flex-col">
      <div className="flex flex-col gap-4 md:gap-8">
        <h2 className="text-2xl">Quick Stats</h2>
        <SummaryOverview />
        <QuickStats prices={coinData.prices} marketCaps={coinData.marketCaps} />
      </div>
    </main>
  )
}

export default HomePage
