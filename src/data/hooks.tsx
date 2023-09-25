import useSWR from 'swr'

import { fetchAccount, fetchAccountTransactions } from '@/data/accounts'
import { fetchRestrictions } from '@/data/restrictions'
import { fetchTransaction } from '@/data/transactions'
import { useAppStore } from '@/store/app'

interface UseAccountDetailsProps {
  publicKey: string | null
}

interface UseAccountTransactionsProps {
  publicKey: string | null
  limit: number
}

interface UseRestrictionsProps {
  publicKey: string | null
}

export const useAccountDetails = ({ publicKey }: UseAccountDetailsProps) => {
  const network = useAppStore((state) => state.network)
  return useSWR(
    publicKey && network ? [network, 'account', publicKey] : null,
    async () =>
      publicKey && network ? await fetchAccount({ publicKey, network }) : null
  )
}

export const useAccountTransactions = ({
  publicKey,
  limit
}: UseAccountTransactionsProps) => {
  const network = useAppStore((state) => state.network)
  return useSWR(
    publicKey && network ? [network, 'accountTransactions', publicKey] : null,
    async () =>
      publicKey && network
        ? await fetchAccountTransactions({ publicKey, limit, network })
        : null
  )
}

export const useTransactionDetails = ({ hash }: { hash: string | null }) => {
  const network = useAppStore((state) => state.network)
  return useSWR(
    hash && network ? [network, 'transaction', hash] : null,
    async () =>
      hash && network ? await fetchTransaction({ hash, network }) : null
  )
}

export const useRestrictions = ({ publicKey }: UseRestrictionsProps) => {
  return useSWR(publicKey ? ['restrictions', publicKey] : null, async () =>
    publicKey ? await fetchRestrictions({ publicKey }) : null
  )
}
