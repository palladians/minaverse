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
import { useAppStore } from '@/store/app'

const useSetLanguage = () => {
  const router = useRouter()
  const setLocale = useAppStore((state) => state.setLocale)

  return async (locale: string) => {
    setLocale(locale)
    await fetch('/api/setLocale', {
      method: 'PATCH',
      body: JSON.stringify({
        locale
      }),
      credentials: 'include'
    })
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
