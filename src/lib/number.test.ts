import { formatNumber } from '@/lib/number'

it('formats a number', () => {
  const number = 235653
  expect(formatNumber({ value: number, locale: 'en' })).toEqual('235,653')
})

it('formats number as compact', () => {
  const number = 235653
  expect(formatNumber({ value: number, locale: 'en', compact: true })).toEqual(
    '236K'
  )
})
