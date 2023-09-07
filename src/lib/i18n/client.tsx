'use client'

import useSWR from 'swr'

import { fetcher } from '@/lib/fetch'
import { constructT } from '@/lib/i18n/common'
import { I18n } from '@/lib/i18n/types'
import { useAppStore } from '@/store/app'

// For Client Components
export const useTranslation = () => {
  const locale = useAppStore((state) => state.locale)
  const { data } = useSWR<I18n>(
    locale ? `/api/i18n/${locale}` : null,
    locale ? fetcher : null
  )
  if (!data?.translation) return { t: () => '' }
  const t = constructT(data?.translation)
  return { t }
}
