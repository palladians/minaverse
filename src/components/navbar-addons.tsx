'use client'

import NextLink from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { useTranslation } from '@/lib/i18n/client'

export const NavbarAddons = () => {
  const pathname = usePathname()
  const { t } = useTranslation()
  return (
    <div className="flex">
      <Button variant={pathname === '/blog' ? 'secondary' : 'ghost'} asChild>
        <NextLink href="/blog">{t('common.blog')}</NextLink>
      </Button>
    </div>
  )
}
