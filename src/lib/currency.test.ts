import { formatCurrency } from '@/lib/currency'

it('formats currency', () => {
  const number = 235653
  expect(
    formatCurrency({
      value: number,
      locale: 'en',
      currency: 'usd'
    })
  ).toEqual('$235,653.00')
})
