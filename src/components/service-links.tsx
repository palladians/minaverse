'use client'

import { Button } from '@/components/ui/button'
import { useTranslation } from '@/lib/i18n/client'

export const ServiceLinks = () => {
  const { t } = useTranslation()
  return (
    <div className="flex items-start flex-col gap-2">
      <Button variant="link" className="p-0 text-md" asChild>
        <a
          href="https://palladians.xyz/privacy"
          target="_blank"
          rel="noreferrer noopener"
        >
          {t('common.privacyPolicy')}
        </a>
      </Button>
      <Button variant="link" className="p-0 text-md" asChild>
        <a
          href="https://palladians.xyz/terms"
          target="_blank"
          rel="noreferrer noopener"
        >
          {t('common.termsAndConditions')}
        </a>
      </Button>
      <Button variant="link" className="p-0 text-md" asChild>
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
