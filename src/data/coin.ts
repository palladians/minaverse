import dayjs from 'dayjs'

const PRICES_URL =
  'https://api.coingecko.com/api/v3/coins/mina-protocol/market_chart?vs_currency=usd&days=7&interval=daily'

export const fetchCoinData = async () => {
  const pricesRequest = await fetch(PRICES_URL)
  const pricesData = await pricesRequest.json()
  return {
    prices: pricesData.prices.map(([timestamp, price]: number[]) => ({
      date: dayjs(timestamp).format('YYYY-MM-DD'),
      price
    })),
    marketCaps: pricesData.market_caps.map(([timestamp, cap]: number[]) => ({
      date: dayjs(timestamp).format('YYYY-MM-DD'),
      cap
    }))
  }
}
