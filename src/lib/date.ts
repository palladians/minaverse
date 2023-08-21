import dayjs from 'dayjs'

export const formatDate = (date: number | string) =>
  dayjs(date).format('DD MMM YYYY hh:mma')
