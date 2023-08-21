'use client'

import { useRouter } from 'next/navigation'
import useSWR from 'swr'

import { AccountDetails } from '@/components/account-details'
import { SheetHeading } from '@/components/sheet-heading'
import { SimpleSkeleton } from '@/components/simple-skeleton'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { useToast } from '@/components/ui/use-toast'
import { fetchAccount } from '@/data/accounts'
import { env } from '@/env.mjs'
import { useAppStore } from '@/store/app'

export const AccountSheet = () => {
  const router = useRouter()
  const { toast } = useToast()
  const currentAccountPublicKey = useAppStore(
    (state) => state.currentAccountPublicKey
  )
  const setCurrentAccountPublicKey = useAppStore(
    (state) => state.setCurrentAccountPublicKey
  )
  const { data: accountData, isLoading: accountLoading } = useSWR(
    currentAccountPublicKey ? ['account', currentAccountPublicKey] : null,
    () =>
      currentAccountPublicKey
        ? fetchAccount({ publicKey: currentAccountPublicKey })
        : null
  )
  const handleOpenExtended = () => {
    if (!accountData?.publicKey) return
    setCurrentAccountPublicKey(null)
    router.push(`/accounts/${accountData.publicKey}`)
  }
  const handleCopy = () => {
    if (!accountData?.publicKey) return
    navigator.clipboard.writeText(
      `${env.NEXT_PUBLIC_APP_URL}/accounts/${accountData.publicKey}`
    )
    toast({ title: 'A link to the account was copied.' })
  }
  return (
    <Sheet
      open={Boolean(currentAccountPublicKey)}
      onOpenChange={() => setCurrentAccountPublicKey(null)}
    >
      <SheetContent className="flex flex-col gap-4 w-full max-w-[64rem] sm:max-w-[40rem]">
        <SheetHeading
          title="Account Overview"
          onOpenExtended={handleOpenExtended}
          onCopy={handleCopy}
        />
        {accountLoading ? (
          <SimpleSkeleton />
        ) : (
          accountData && <AccountDetails accountData={accountData} />
        )}
      </SheetContent>
    </Sheet>
  )
}
