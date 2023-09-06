type FormatProps = {
  value: number
  locale: string
  style?: string
  currency?: string
  compact?: boolean
}

export const formatNumber = ({
  value,
  locale,
  style = 'decimal',
  currency = 'usd',
  compact = false
}: FormatProps) =>
  Intl.NumberFormat(locale, {
    style,
    currency,
    notation: compact ? 'compact' : 'standard'
  })
    .format(value)
    .toString()
