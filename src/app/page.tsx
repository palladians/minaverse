import { QuickStats } from '@/components/quick-stats'
import { SummaryOverview } from '@/components/summary-overview'
import { fetchCoinData } from '@/data/coin'

const HomePage = async () => {
  const coinData = await fetchCoinData()
  return (
    <main className="flex-1">
      <div className="flex flex-col gap-8">
        <h2 className="text-2xl">Quick Stats</h2>
        <SummaryOverview />
        <QuickStats prices={coinData.prices} marketCaps={coinData.marketCaps} />
      </div>
    </main>
  )
}

export default HomePage
