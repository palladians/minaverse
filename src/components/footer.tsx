/* eslint-disable react/jsx-no-literals */
import NextImage from 'next/image'

import { FooterOptions } from '@/components/footer-options'
import { ServiceLinks } from '@/components/service-links'
import { getT } from '@/lib/i18n/server'

export const Footer = async () => {
  const year = new Date().getFullYear()
  const t = await getT()
  return (
    <div className="hidden md:flex flex-col border-t py-20 gap-12">
      <div className="container grid grid-cols-[2fr_1fr_1fr] items-start gap-8">
        <div className="flex flex-3 flex-col gap-8">
          <NextImage
            src="/logo.svg"
            width={120}
            height={20}
            alt="Logo"
            className="dark:invert opacity-75"
          />
          <p className="opacity-75">{t('common.trulyOpen')}</p>
          <a
            href="https://pallad.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-75"
          >
            {t('common.needWallet')}
          </a>
          <FooterOptions />
        </div>
        <div className="flex flex-1 flex-col gap-2 items-start">
          <h4 className="text-lg">Service</h4>
          <ServiceLinks />
        </div>
        <div className="flex flex-1 flex-col gap-2 items-start">
          <h4 className="text-lg">Edu</h4>
        </div>
      </div>
      <div className="text-center py-2">
        <a
          href="https://palladians.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm opacity-75"
        >
          &copy; {year} Palladians
        </a>
      </div>
    </div>
  )
}
