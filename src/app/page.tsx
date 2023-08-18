import { QuickStats } from '@/components/quick-stats'
import { fetchCoinData } from '@/data/coin'

const HomePage = async () => {
  const coinData = await fetchCoinData()
  return (
    <main className="flex-1">
      <QuickStats prices={coinData.prices} marketCaps={coinData.marketCaps} />
    </main>
  )
}

export default HomePage
