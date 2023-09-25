'use client'

import React from 'react'

import { LanguageChoice } from '@/components/language-choice'
import { NetworkChoice } from '@/components/network-choice'
import { ServiceLinks } from '@/components/service-links'
import { ThemeChoice } from '@/components/settings/theme-choice'
import { SheetHeading } from '@/components/sheet-heading'
import { Socials } from '@/components/socials'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { useTranslation } from '@/lib/i18n/client'
import { useAppStore } from '@/store/app'

import packageJson from '../../../package.json'

export const SettingsSheet = () => {
  const { t } = useTranslation()
  const settingsOpen = useAppStore((state) => state.settingsOpen)
  const setSettingsOpen = useAppStore((state) => state.setSettingsOpen)
  return (
    <Sheet open={settingsOpen} onOpenChange={() => setSettingsOpen(false)}>
      <SheetContent className="flex flex-col gap-8 w-full max-w-[64rem] sm:max-w-[40rem]">
        <SheetHeading title={t('common.settings')} />
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 data-testid="settings__header">{t('common.network')}</h2>
            <NetworkChoice />
          </div>
          <div className="flex flex-col gap-2">
            <h2>{t('common.theme')}</h2>
            <ThemeChoice />
          </div>
          <div className="flex flex-col gap-2">
            <h2>{t('common.language')}</h2>
            <LanguageChoice />
          </div>
          <div className="flex flex-col gap-2">
            <h2>{t('common.fiatCurrency')}</h2>
            <div>
              <Badge className="pointer-events-none">
                {t('common.comingSoon')}
              </Badge>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2>{t('common.version')}</h2>
            <p>{packageJson.version}</p>
          </div>
          <div className="flex flex-col gap-2">
            <h2>{t('common.about')}</h2>
            <div className="flex gap-2">
              <Socials />
            </div>
            <ServiceLinks />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
