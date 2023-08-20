'use client'

import { useMemo } from 'react'
import useSWR from 'swr'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchAccount } from '@/data/accounts'
import { formatNumber } from '@/lib/number'
import { useAppStore } from '@/store/app'

export const AccountSheet = () => {
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
  const fields = useMemo(
    () => [
      { label: 'Public Key', value: accountData?.account.publicKey },
      {
        label: 'Balance',
        value: formatNumber(Number(accountData?.account.balance.total))
      },
      { label: 'Nonce', value: accountData?.account.nonce },
      { label: 'Delegate', value: accountData?.account.delegate },
      { label: 'Username', value: accountData?.account.username },
      { label: 'Total Transactions', value: accountData?.account.totalTx }
    ],
    [accountData]
  )
  return (
    <Sheet
      open={Boolean(currentAccountPublicKey)}
      onOpenChange={() => setCurrentAccountPublicKey(null)}
    >
      <SheetContent className="flex flex-col gap-4 w-full max-w-[64rem] sm:max-w-[40rem]">
        <SheetHeader>
          <SheetTitle>Account Overview</SheetTitle>
        </SheetHeader>
        {accountLoading ? (
          <div className="flex flex-col gap-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : (
          <div className="grid gap-4 py-4">
            {fields.map((field) => (
              <div className="grid grid-cols-4 items-center gap-8">
                <p className="text-right text-sm">{field.label}</p>
                <p className="col-span-3 break-all leading-8">{field.value}</p>
              </div>
            ))}
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
