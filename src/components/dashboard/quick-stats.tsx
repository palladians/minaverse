import { MarketCapChart } from '@/components/dashboard/market-cap-chart'
import { PriceChart } from '@/components/dashboard/price-chart'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { formatCurrency, formatCurrencyCompact } from '@/lib/currency'
import { getT } from '@/lib/i18n/server'

const ONE_DAY_CHANGE = '1d: '

const toPercent = (value: number) => `${(value * 100).toFixed(2)}%`

interface QuickStatsProps {
  prices: Record<string, string | number>[]
  marketCaps: Record<string, string | number>[]
}

export const QuickStats = async ({ prices, marketCaps }: QuickStatsProps) => {
  const t = await getT()
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
            <h3 className="text-sm text-muted-foreground">
              {t('dashboard.minaPrice')}
            </h3>
            <p className="text-xl font-semibold">
              {formatCurrency(Number(prices[6].price))}
            </p>
          </div>
          <Badge variant="outline">
            {ONE_DAY_CHANGE}
            {prices[6].price > prices[5].price ? '+' : '-'}
            {toPercent(priceDelta || 0)}
          </Badge>
        </div>
        <PriceChart prices={prices} />
      </Card>
      <Card className="flex flex-col flex-1 gap-4 p-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <h3 className="text-sm text-muted-foreground">
              {t('dashboard.minaMarketCap')}
            </h3>
            <p className="text-xl font-semibold">
              {formatCurrencyCompact(Number(marketCaps[6].cap))}
            </p>
          </div>
          <Badge variant="outline">
            {ONE_DAY_CHANGE}
            {marketCaps[6].cap > marketCaps[5].cap ? '+' : '-'}
            {toPercent(capDelta || 0)}
          </Badge>
        </div>
        <MarketCapChart marketCaps={marketCaps} />
      </Card>
    </div>
  )
}
