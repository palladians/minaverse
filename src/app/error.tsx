'use client'

import { reportError } from '@/data/error'
import { useTranslation } from '@/lib/i18n/client'
import { useAppStore } from '@/store/app'

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  const { t } = useTranslation()
  const locale = useAppStore((state) => state.locale) || 'en'
  const network = useAppStore((state) => state.network) || 'mainnet'
  const tryAgain = async () => {
    await reportError({ payload: error, context: { locale, network } })
    return reset()
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold">
        {t('common.somethingWentWrong')}
      </h2>
      <button onClick={tryAgain}>{t('common.tryAgain')}</button>
    </div>
  )
}

export default Error
