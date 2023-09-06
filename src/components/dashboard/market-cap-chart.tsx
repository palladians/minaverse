'use client'

import { AreaChart } from '@tremor/react'

import { formatCurrency } from '@/lib/currency'

interface MarketCapChartProps {
  marketCaps: Record<string, string | number>[]
  locale: string
}

export const MarketCapChart = ({ marketCaps, locale }: MarketCapChartProps) => {
  return (
    <AreaChart
      data={marketCaps}
      categories={['cap']}
      index="date"
      colors={['indigo']}
      valueFormatter={(value) =>
        formatCurrency({ value, locale, currency: 'USD', compact: true })
      }
      showLegend={false}
      autoMinValue={true}
      yAxisWidth={80}
    />
  )
}
