'use client'

import { AreaChart } from '@tremor/react'

import { formatCurrency } from '@/lib/currency'

interface PriceChartProps {
  prices: Record<string, string | number>[]
  locale: string
}

export const PriceChart = ({ prices, locale }: PriceChartProps) => {
  return (
    <AreaChart
      data={prices}
      categories={['price']}
      index="date"
      colors={['cyan']}
      valueFormatter={(value) =>
        formatCurrency({ value, locale, currency: 'USD' })
      }
      showLegend={false}
      autoMinValue={true}
      yAxisWidth={64}
    />
  )
}
