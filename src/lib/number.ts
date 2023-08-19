export const formatNumber = (value: number) =>
  Intl.NumberFormat('us').format(value).toString()

export const formatNumberCompact = (value: number) =>
  Intl.NumberFormat('us', { notation: 'compact' }).format(value).toString()
