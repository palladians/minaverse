import pupa from 'pupa'
import { path } from 'rambda'

import { Dictionary } from '@/app/api/i18n/schema'

export const constructT =
  (dictionary: Dictionary) =>
  (pathToSearch: string, interpolations?: Record<string, string>) => {
    const baseValue = path(pathToSearch, dictionary)
    const pathSplit = pathToSearch.split('.')
    if (!baseValue) return pathSplit[pathSplit.length - 1]
    return pupa(String(baseValue), interpolations || {})
  }
