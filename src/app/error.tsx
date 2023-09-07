'use client'

import { useEffect } from 'react'

import { reportError } from '@/data/error'
import { useTranslation } from '@/lib/i18n/client'

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  const { t } = useTranslation()
  useEffect(() => {
    reportError(error)
  }, [error])

  return (
    <div>
      <h2 className="text-2xl font-semibold">{t('somethingWentWrong')}</h2>
      <button onClick={() => reset()}>{t('tryAgain')}</button>
    </div>
  )
}

export default Error
