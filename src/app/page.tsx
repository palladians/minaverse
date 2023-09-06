import { Metadata } from 'next'
import React from 'react'

import { QuickStats } from '@/components/dashboard/quick-stats'
import { SummaryOverview } from '@/components/dashboard/summary-overview'
import { fetchCoinData } from '@/data/coin'
import { getLocale, getT } from '@/lib/i18n/server'

export const metadata: Metadata = {
  title: 'The universe of Mina Protocol - Minaverse'
}

const HomePage = async () => {
  const t = await getT()
  const locale = getLocale() || 'en'
  const coinData = await fetchCoinData({ locale })
  return (
    <main className="flex-1 flex flex-col">
      <div className="flex flex-col gap-4 md:gap-8">
        <h2 className="text-2xl font-semibold" data-testid="dashboard__header">
          {t('dashboard.header')}
        </h2>
        <SummaryOverview />
        <QuickStats prices={coinData.prices} marketCaps={coinData.marketCaps} />
      </div>
    </main>
  )
}

export default HomePage
