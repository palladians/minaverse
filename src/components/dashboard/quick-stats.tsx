'use client'

import { AreaChart } from '@tremor/react'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { formatCurrency, formatCurrencyCompact } from '@/lib/currency'

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
    <div className="flex gap-4 md:gap-8 md:flex-row flex-col">
      <Card className="flex flex-col flex-1 gap-4 p-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <h3 className="text-sm text-semibold text-muted-foreground">
              Mina Price
            </h3>
            <p className="text-xl">{formatCurrency(Number(prices[6].price))}</p>
          </div>
          <Badge variant="outline">
            {prices[6].price > prices[5].price ? '+' : '-'}
            {toPercent(priceDelta || 0)}
          </Badge>
        </div>
        <AreaChart
          data={prices}
          categories={['price']}
          index="date"
          colors={['fuchsia']}
          valueFormatter={formatCurrency}
          showLegend={false}
        />
      </Card>
      <Card className="flex flex-col flex-1 gap-4 p-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <h3 className="text-sm text-semibold text-muted-foreground">
              Mina Market Cap
            </h3>
            <p className="text-xl">
              {formatCurrencyCompact(Number(marketCaps[6].cap))}
            </p>
          </div>
          <Badge variant="outline">
            {marketCaps[6].cap > marketCaps[5].cap ? '+' : '-'}
            {toPercent(capDelta || 0)}
          </Badge>
        </div>
        <AreaChart
          data={marketCaps}
          categories={['cap']}
          index="date"
          colors={['teal']}
          valueFormatter={formatCurrencyCompact}
          showLegend={false}
        />
      </Card>
    </div>
  )
}
