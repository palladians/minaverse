'use client'

import { AreaChart } from '@tremor/react'

import { Badge } from '@/components/ui/badge'
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

const toPercent = (value: number) => `${(value * 100).toFixed(2)}%`

interface QuickStatsProps {
  prices: Record<string, string | number>[]
  marketCaps: Record<string, string | number>[]
}

export const QuickStats = ({ prices, marketCaps }: QuickStatsProps) => {
  const priceDelta =
    prices[6].price &&
    Math.abs(Number(prices[6].price) - Number(prices[5].price)) /
      Number(prices[6].price)
  const capDelta =
    marketCaps[6].cap &&
    Math.abs(Number(marketCaps[6].cap) - Number(marketCaps[5].cap)) /
      Number(marketCaps[6].cap)
  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl">Quick Stats</h2>
      <div className="flex gap-8 md:flex-row flex-col">
        <Card className="flex flex-col flex-1 gap-4 p-4">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <h3 className="text-sm">Mina Price</h3>
              <p className="text-xl">
                {dataFormatter(Number(prices[6].price))}
              </p>
            </div>
            <Badge variant="outline">
              {Number(priceDelta) > 0 ? '+' : '-'}
              {toPercent(priceDelta || 0)}
            </Badge>
          </div>
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
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <h3 className="text-sm">Mina Market Cap</h3>
              <p className="text-xl">
                {dataFormatterCompact(Number(marketCaps[6].cap))}
              </p>
            </div>
            <Badge variant="outline">
              {Number(capDelta) > 0 ? '+' : '-'}
              {toPercent(capDelta || 0)}
            </Badge>
          </div>
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
