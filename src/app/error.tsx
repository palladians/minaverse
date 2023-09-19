'use client'

import { useEffect } from 'react'

import { reportError } from '@/data/error'
import { useTranslation } from '@/lib/i18n/client'
import { useAppStore } from '@/store/app'

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  const { t } = useTranslation()
  const locale = useAppStore((state) => state.locale) || 'en'
  const network = useAppStore((state) => state.network) || 'mainnet'
  useEffect(() => {
    reportError({ payload: error, context: { locale, network } })
  }, [error])

  return (
    <div>
      <h2 className="text-2xl font-semibold">{t('somethingWentWrong')}</h2>
      <button onClick={() => reset()}>{t('tryAgain')}</button>
    </div>
  )
}

export default Error
