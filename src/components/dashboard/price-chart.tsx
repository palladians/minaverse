'use client'

import { AreaChart } from '@tremor/react'

import { formatCurrency } from '@/lib/currency'

interface PriceChartProps {
  prices: Record<string, string | number>[]
}

export const PriceChart = ({ prices }: PriceChartProps) => {
  return (
    <AreaChart
      data={prices}
      categories={['price']}
      index="date"
      colors={['fuchsia']}
      valueFormatter={formatCurrency}
      showLegend={false}
      autoMinValue={true}
    />
  )
}
