import { env } from '@/env.mjs'

export const appUrl = (path: string) => `${env.NEXT_PUBLIC_APP_URL}${path}`

type UrlFnProps = { network: string }
type UrlFnIdProps = UrlFnProps & { id: string }

export const AppUrls = {
  accounts: ({ network }: UrlFnProps) => `/${network}/accounts`,
  account: ({ network, id }: UrlFnIdProps) => `/${network}/accounts/${id}`,
  transactions: ({ network }: UrlFnProps) => `/${network}/transactions`,
  transaction: ({ network, id }: UrlFnIdProps) =>
    `/${network}/transactions/${id}`,
  staking: ({ network }: UrlFnProps) => `/${network}/staking`
}
