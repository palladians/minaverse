import 'dayjs/locale/pl'
import 'dayjs/locale/tr'

import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(timezone)
dayjs.extend(utc)
dayjs.extend(localizedFormat)

export const formatDate = ({
  date,
  locale
}: {
  date: number | string
  locale: string
}) => {
  return dayjs(date).locale(locale).format('lll')
}

export const formatDateShort = ({
  date,
  locale
}: {
  date: number | string
  locale: string
}) => {
  return dayjs(date).locale(locale).format('MMM DD')
}
