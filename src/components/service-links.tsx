'use client'

import { Button } from '@/components/ui/button'
import { useTranslation } from '@/lib/i18n/client'

export const ServiceLinks = () => {
  const { t } = useTranslation()
  return (
    <div className="flex items-start flex-col md:flex-row gap-0 md:gap-4">
      <Button variant="link" className="p-0" asChild>
        <a
          href="https://palladians.xyz/privacy"
          target="_blank"
          rel="noreferrer noopener"
        >
          {t('common.privacyPolicy')}
        </a>
      </Button>
      <Button variant="link" className="p-0" asChild>
        <a
          href="https://palladians.xyz/terms"
          target="_blank"
          rel="noreferrer noopener"
        >
          {t('common.termsAndConditions')}
        </a>
      </Button>
      <Button variant="link" className="p-0" asChild>
        <a
          href="https://status.palladians.xyz/status/minaverse"
          target="_blank"
          rel="noreferrer noopener"
        >
          {t('common.serviceStatus')}
        </a>
      </Button>
    </div>
  )
}
