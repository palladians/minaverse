import { formatNumber, formatNumberCompact } from '@/lib/number'

export const formatCurrency = (number: number) => {
  const formattedValue = formatNumber(number)
  return `$${formattedValue}`
}

export const formatCurrencyCompact = (number: number) => {
  const formattedValue = formatNumberCompact(number)
  return `$${formattedValue}`
}
