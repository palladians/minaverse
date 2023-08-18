export const formatCurrency = (number: number) => {
  return '$' + Intl.NumberFormat('us').format(number).toString()
}

export const formatCurrencyCompact = (number: number) => {
  return (
    '$' +
    Intl.NumberFormat('us', { notation: 'compact' }).format(number).toString()
  )
}
