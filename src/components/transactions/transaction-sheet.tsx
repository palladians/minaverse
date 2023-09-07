'use client'

import { ExternalLinkIcon, LinkIcon } from 'lucide-react'
import NextLink from 'next/link'
import React from 'react'

import { SheetHeading } from '@/components/sheet-heading'
import { SimpleSkeleton } from '@/components/simple-skeleton'
import { TransactionDetails } from '@/components/transactions/transaction-details'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { useTransactionDetails } from '@/data/hooks'
import { useClipboard } from '@/lib/clipboard'
import { useTranslation } from '@/lib/i18n/client'
import { appUrl, AppUrls } from '@/lib/url'
import { useAppStore } from '@/store/app'

export const TransactionSheet = ({ network }: { network: string }) => {
  const { t } = useTranslation()
  const { copyValue } = useClipboard()
  const currentTransactionHash = useAppStore(
    (state) => state.currentTransactionHash
  )
  const setCurrentTransactionHash = useAppStore(
    (state) => state.setCurrentTransactionHash
  )
  const { data: transactionData, isLoading: transactionLoading } =
    useTransactionDetails({ hash: currentTransactionHash })
  const handleCopy = () => {
    if (!transactionData?.hash) return
    return copyValue({
      value: appUrl(AppUrls.transaction({ network, id: transactionData.hash }))
    })
  }
  return (
    <Sheet
      open={Boolean(currentTransactionHash)}
      onOpenChange={() => setCurrentTransactionHash(null)}
    >
      <SheetContent className="flex flex-col gap-4 w-full max-w-[64rem] sm:max-w-[40rem]">
        <SheetHeading
          title={t('transactions.transactionDetails')}
          addons={
            <>
              <Button size="icon" variant="ghost" asChild>
                {transactionData?.hash && (
                  <NextLink
                    href={AppUrls.transaction({
                      network,
                      id: transactionData.hash
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
        {transactionLoading ? (
          <SimpleSkeleton />
        ) : (
          transactionData && (
            <TransactionDetails
              transactionData={transactionData}
              network={network}
            />
          )
        )}
      </SheetContent>
    </Sheet>
  )
}
