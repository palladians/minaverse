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
import { env } from '@/env.mjs'
import { useClipboard } from '@/lib/clipboard'
import { useAppStore } from '@/store/app'

export const TransactionSheet = () => {
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
      value: `${env.NEXT_PUBLIC_APP_URL}/transactions/${transactionData.hash}`
    })
  }
  return (
    <Sheet
      open={Boolean(currentTransactionHash)}
      onOpenChange={() => setCurrentTransactionHash(null)}
    >
      <SheetContent className="flex flex-col gap-4 w-full max-w-[64rem] sm:max-w-[40rem]">
        <SheetHeading
          title="Transaction Details"
          addons={
            <>
              <Button size="icon" variant="ghost" asChild>
                <NextLink href={`/transactions/${transactionData?.hash}`}>
                  <ExternalLinkIcon size={20} />
                </NextLink>
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
            <TransactionDetails transactionData={transactionData} />
          )
        )}
      </SheetContent>
    </Sheet>
  )
}
