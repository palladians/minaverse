'use client'

import { AreaChart } from '@tremor/react'

import { formatCurrencyCompact } from '@/lib/currency'

interface MarketCapChartProps {
  marketCaps: Record<string, string | number>[]
}

export const MarketCapChart = ({ marketCaps }: MarketCapChartProps) => {
  return (
    <AreaChart
      data={marketCaps}
      categories={['cap']}
      index="date"
      colors={['teal']}
      valueFormatter={formatCurrencyCompact}
      showLegend={false}
      autoMinValue={true}
    />
  )
}
