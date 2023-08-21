'use client'

import { useRouter } from 'next/navigation'
import useSWR from 'swr'

import { SheetHeading } from '@/components/sheet-heading'
import { SimpleSkeleton } from '@/components/simple-skeleton'
import { TransactionDetails } from '@/components/transaction-details'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { useToast } from '@/components/ui/use-toast'
import { fetchTransaction } from '@/data/transactions'
import { env } from '@/env.mjs'
import { useAppStore } from '@/store/app'

export const TransactionSheet = () => {
  const router = useRouter()
  const { toast } = useToast()
  const currentTransactionHash = useAppStore(
    (state) => state.currentTransactionHash
  )
  const setCurrentTransactionHash = useAppStore(
    (state) => state.setCurrentTransactionHash
  )
  const { data: transactionData, isLoading: transactionLoading } = useSWR(
    currentTransactionHash ? ['transaction', currentTransactionHash] : null,
    () =>
      currentTransactionHash
        ? fetchTransaction({ hash: currentTransactionHash })
        : null
  )
  const handleOpenExtended = () => {
    if (!transactionData?.hash) return
    setCurrentTransactionHash(null)
    router.push(`/transactions/${transactionData.hash}`)
  }
  const handleCopy = () => {
    if (!transactionData?.hash) return
    navigator.clipboard.writeText(
      `${env.NEXT_PUBLIC_APP_URL}/transactions/${transactionData.hash}`
    )
    toast({ title: 'A link to the transaction was copied.' })
  }
  return (
    <Sheet
      open={Boolean(currentTransactionHash)}
      onOpenChange={() => setCurrentTransactionHash(null)}
    >
      <SheetContent className="flex flex-col gap-4 w-full max-w-[64rem] sm:max-w-[40rem]">
        <SheetHeading
          title="Transaction Details"
          onCopy={handleCopy}
          onOpenExtended={handleOpenExtended}
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
