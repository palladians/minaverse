import { cookies } from 'next/headers'

import { constructT } from '@/lib/i18n/common'
import { I18n } from '@/lib/i18n/types'
import { appUrl } from '@/lib/url'

export const getLocale = () => {
  return cookies().get('minaverse-locale')?.value
}

// For React Server Components
export const getTranslation = async () => {
  const locale = getLocale() || 'en'
  const request = await fetch(appUrl(`/api/i18n/${locale}`), {
    credentials: 'include'
  })
  const i18n = (await request.json()) as I18n
  return i18n.translation
}

export const getT = async () => {
  const dictionary = await getTranslation()
  return constructT(dictionary)
}
