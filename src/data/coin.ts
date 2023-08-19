import dayjs from 'dayjs'

const PRICES_URL =
  'https://api.coingecko.com/api/v3/coins/mina-protocol/market_chart?vs_currency=usd&days=6&interval=daily'

type NumericalData = number[]

type PricesResponse = {
  prices: NumericalData[]
  market_caps: NumericalData[]
  total_volumes: NumericalData[]
}

export const fetchCoinData = async () => {
  const pricesRequest = await fetch(PRICES_URL)
  const pricesData = (await pricesRequest.json()) as PricesResponse
  return {
    prices: pricesData.prices.map(([timestamp, price]) => ({
      date: dayjs(timestamp).format('MMM DD'),
      price
    })),
    marketCaps: pricesData.market_caps.map(([timestamp, cap]) => ({
      date: dayjs(timestamp).format('MMM DD'),
      cap
    }))
  }
}
