'use client'

import { ExternalLinkIcon, LinkIcon } from 'lucide-react'
import NextLink from 'next/link'
import React from 'react'

import { AccountDetails } from '@/components/accounts/account-details'
import { SheetHeading } from '@/components/sheet-heading'
import { SimpleSkeleton } from '@/components/simple-skeleton'
import { TransactionsWidget } from '@/components/transactions/transactions-widget'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { useAccountDetails } from '@/data/hooks'
import { useClipboard } from '@/lib/clipboard'
import { useTranslation } from '@/lib/i18n/client'
import { appUrl, AppUrls } from '@/lib/url'
import { useAppStore } from '@/store/app'

export const AccountSheet = () => {
  const { t } = useTranslation()
  const currentAccountPublicKey = useAppStore(
    (state) => state.currentAccountPublicKey
  )
  const setCurrentAccountPublicKey = useAppStore(
    (state) => state.setCurrentAccountPublicKey
  )
  const network = useAppStore((state) => state.network) || 'mainnet'
  const { copyValue } = useClipboard()
  const { data: accountData, isLoading: accountLoading } = useAccountDetails({
    publicKey: currentAccountPublicKey
  })
  const handleCopy = () => {
    if (!accountData?.publicKey) return
    return copyValue({
      value: appUrl(AppUrls.account({ network, id: accountData.publicKey }))
    })
  }
  return (
    <Sheet
      open={Boolean(currentAccountPublicKey)}
      onOpenChange={() => setCurrentAccountPublicKey(null)}
    >
      <SheetContent className="flex flex-col gap-8 w-full max-w-[64rem] sm:max-w-[40rem]">
        <SheetHeading
          title={t('accounts.accountOverview')}
          addons={
            <>
              <Button size="icon" variant="ghost" asChild>
                {accountData?.publicKey && (
                  <NextLink
                    href={AppUrls.account({
                      network,
                      id: accountData.publicKey
                    })}
                  >
                    <ExternalLinkIcon size={20} />
                  </NextLink>
                )}
              </Button>
              <Button size="icon" variant="ghost" onClick={handleCopy}>
                <LinkIcon size={20} />
              </Button>
            </>
          }
        />
        {accountLoading ? (
          <SimpleSkeleton />
        ) : (
          accountData && (
            <AccountDetails accountData={accountData} network={network} />
          )
        )}
        <TransactionsWidget network={network} />
      </SheetContent>
    </Sheet>
  )
}
