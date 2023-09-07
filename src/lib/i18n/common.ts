import pupa from 'pupa'
import { path } from 'rambda'

import { Dictionary } from '@/app/api/i18n/schema'
import { appUrl } from '@/lib/url'

export const constructT =
  (dictionary: Dictionary) =>
  (pathToSearch: string, interpolations?: Record<string, string>) => {
    const baseValue = path(pathToSearch, dictionary)
    const pathSplit = pathToSearch.split('.')
    if (!baseValue) return pathSplit[pathSplit.length - 1]
    return pupa(String(baseValue), interpolations || {})
  }

export const setLocale = async (locale: string) => {
  await fetch(appUrl('/api/setLocale'), {
    method: 'PATCH',
    body: JSON.stringify({
      locale
    }),
    credentials: 'include'
  })
}
