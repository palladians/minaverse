import { Metadata } from 'next'
import React from 'react'

import { QuickStats } from '@/components/dashboard/quick-stats'
import { SummaryOverview } from '@/components/dashboard/summary-overview'
import { fetchCoinData } from '@/data/coin'
import { getLocale, getT } from '@/lib/i18n/server'
import { titleTemplate } from '@/lib/metadata'

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getT()
  return {
    title: titleTemplate(t('common.title'))
  }
}

const HomePage = async () => {
  const t = await getT()
  const locale = getLocale()
  const coinData = await fetchCoinData({ locale })
  return (
    <main className="flex-1 flex flex-col">
      <div className="flex flex-col gap-4 md:gap-8">
        <h2 className="text-2xl font-semibold" data-testid="dashboard__header">
          {t('dashboard.header')}
        </h2>
        <SummaryOverview locale={locale} />
        <QuickStats
          prices={coinData.prices}
          marketCaps={coinData.marketCaps}
          locale={locale}
        />
      </div>
    </main>
  )
}

export default HomePage
