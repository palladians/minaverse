'use client'

import NextLink from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Menubar } from '@/components/ui/menubar'
import { useTranslation } from '@/lib/i18n/client'
import { AppUrls } from '@/lib/url'

export const NavbarLinks = ({ network = 'mainnet' }: { network: string }) => {
  const { t } = useTranslation()
  const pathname = usePathname()
  const NAV_LINKS = [
    {
      label: t('common.accounts'),
      url: AppUrls.accounts({ network }),
      testId: 'navigation__accounts'
    },
    {
      label: t('common.transactions'),
      url: AppUrls.transactions({ network }),
      testId: 'navigation__transactions'
    },
    {
      label: t('common.staking'),
      url: AppUrls.staking({ network }),
      testId: 'navigation__staking'
    }
  ]
  return (
    <div className="hidden md:flex justify-center items-center">
      <Menubar className="border-none">
        {NAV_LINKS.map((link) => (
          <Button
            key={link.url}
            variant={pathname === link.url ? 'secondary' : 'ghost'}
            size="sm"
            asChild
            data-testid={link.testId}
          >
            <NextLink href={link.url}>{link.label}</NextLink>
          </Button>
        ))}
      </Menubar>
    </div>
  )
}
