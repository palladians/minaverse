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
import { env } from '@/env.mjs'
import { useClipboard } from '@/lib/clipboard'
import { useAppStore } from '@/store/app'

export const AccountSheet = () => {
  const currentAccountPublicKey = useAppStore(
    (state) => state.currentAccountPublicKey
  )
  const setCurrentAccountPublicKey = useAppStore(
    (state) => state.setCurrentAccountPublicKey
  )
  const { copyValue } = useClipboard()
  const { data: accountData, isLoading: accountLoading } = useAccountDetails({
    publicKey: currentAccountPublicKey
  })
  const handleCopy = () => {
    if (!accountData?.publicKey) return
    return copyValue({
      value: `${env.NEXT_PUBLIC_APP_URL}/accounts/${accountData.publicKey}`
    })
  }
  return (
    <Sheet
      open={Boolean(currentAccountPublicKey)}
      onOpenChange={() => setCurrentAccountPublicKey(null)}
    >
      <SheetContent className="flex flex-col gap-8 w-full max-w-[64rem] sm:max-w-[40rem]">
        <SheetHeading
          title="Account Overview"
          addons={
            <>
              <Button size="icon" variant="ghost" asChild>
                <NextLink href={`/accounts/${accountData?.publicKey}`}>
                  <ExternalLinkIcon size={20} />
                </NextLink>
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
          accountData && <AccountDetails accountData={accountData} />
        )}
        <TransactionsWidget />
      </SheetContent>
    </Sheet>
  )
}
