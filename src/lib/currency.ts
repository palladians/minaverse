import { formatNumber } from '@/lib/number'

type FormatProps = {
  value: number
  locale: string
  currency: string
  compact?: boolean
}

export const formatCurrency = ({
  value,
  locale,
  currency,
  compact = false
}: FormatProps) => {
  return formatNumber({
    value,
    locale,
    style: 'currency',
    currency,
    compact
  })
}
