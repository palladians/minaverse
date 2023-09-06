'use client'

import { useRouter } from 'next/navigation'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useTranslation } from '@/lib/i18n/client'
import { setLocale } from '@/lib/i18n/common'
import { useAppStore } from '@/store/app'

const useSetLanguage = () => {
  const router = useRouter()

  return async (locale: string) => {
    await setLocale(locale)
    router.refresh()
  }
}

const LANGUAGES = [
  { label: 'English', value: 'en' },
  { label: 'Polski', value: 'pl' }
]

export const LanguageChoice = () => {
  const setLanguage = useSetLanguage()
  const { t } = useTranslation()
  const locale = useAppStore((state) => state.locale) || 'en'
  return (
    <Select value={locale} onValueChange={(lang) => setLanguage(lang)}>
      <SelectTrigger className="w-[180px] h-11">
        <SelectValue placeholder="Select Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t('common.languages')}</SelectLabel>
          {LANGUAGES.map((lang) => (
            <SelectItem key={lang.value} value={lang.value}>
              {lang.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
