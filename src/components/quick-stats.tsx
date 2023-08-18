'use client'

import { AreaChart } from '@tremor/react'

import { Card } from '@/components/ui/card'

const dataFormatter = (number: number) => {
  return '$' + Intl.NumberFormat('us').format(number).toString()
}

const dataFormatterCompact = (number: number) => {
  return (
    '$' +
    Intl.NumberFormat('us', { notation: 'compact' }).format(number).toString()
  )
}

interface QuickStatsProps {
  prices: Record<string, string | number>[]
  marketCaps: Record<string, string | number>[]
}

export const QuickStats = ({ prices, marketCaps }: QuickStatsProps) => {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl">Quick Stats</h2>
      <div className="flex gap-8 md:flex-row flex-col">
        <Card className="flex flex-col flex-1 gap-4 p-4">
          <h3 className="text-xl">Mina Price</h3>
          <AreaChart
            data={prices}
            categories={['price']}
            index="date"
            colors={['pink']}
            valueFormatter={dataFormatter}
            showLegend={false}
          />
        </Card>
        <Card className="flex flex-col flex-1 gap-4 p-4">
          <h3 className="text-xl">Mina Market Cap</h3>
          <AreaChart
            data={marketCaps}
            categories={['cap']}
            index="date"
            colors={['yellow']}
            valueFormatter={dataFormatterCompact}
            showLegend={false}
          />
        </Card>
      </div>
    </div>
  )
}
