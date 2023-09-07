import NextImage from 'next/image'

import { FooterOptions } from '@/components/footer-options'
import { ServiceLinks } from '@/components/service-links'
import { getT } from '@/lib/i18n/server'

export const Footer = async () => {
  const t = await getT()
  return (
    <div className="hidden md:flex flex-col md:flex-row justify-between md:items-center border-t py-8 gap-8">
      <div className="flex flex-col gap-4">
        <NextImage
          src="/logo.svg"
          width={120}
          height={20}
          alt="Logo"
          className="dark:invert opacity-75"
        />
        <p className="text-sm opacity-75">{t('common.trulyOpen')}</p>
        <a
          href="https://palladians.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm opacity-75"
        >
          {t('common.createdAndMaintained')}
        </a>
        <a
          href="https://pallad.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm opacity-75"
        >
          {t('common.needWallet')}
        </a>
      </div>
      <div className="flex flex-col items-start md:items-end gap-2">
        <FooterOptions />
        <ServiceLinks />
      </div>
    </div>
  )
}
