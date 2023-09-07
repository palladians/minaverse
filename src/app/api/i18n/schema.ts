import { z } from 'zod'

export const localeSchema = z.object({
  common: z.object({
    title: z.string(),
    dashboard: z.string(),
    accounts: z.string(),
    transactions: z.string(),
    staking: z.string(),
    settings: z.string(),
    trulyOpen: z.string(),
    createdAndMaintained: z.string(),
    needWallet: z.string(),
    privacyPolicy: z.string(),
    termsAndConditions: z.string(),
    serviceStatus: z.string(),
    typeCommand: z.string(),
    noResults: z.string(),
    publicKey: z.string(),
    balance: z.string(),
    nonce: z.string(),
    delegate: z.string(),
    somethingWentWrong: z.string(),
    tryAgain: z.string(),
    hash: z.string(),
    from: z.string(),
    to: z.string(),
    amount: z.string(),
    date: z.string(),
    dateTime: z.string(),
    mina: z.string(),
    columns: z.string(),
    language: z.string(),
    environments: z.string(),
    network: z.string(),
    theme: z.string(),
    fiatCurrency: z.string(),
    comingSoon: z.string(),
    version: z.string(),
    about: z.string(),
    toggleTheme: z.string(),
    light: z.string(),
    dark: z.string(),
    system: z.string(),
    seeAll: z.string(),
    close: z.string(),
    minaAmount: z.string(),
    username: z.string(),
    searchWithPublicKey: z.string(),
    searchWithHash: z.string(),
    name: z.string(),
    delegates: z.string(),
    blockChance: z.string(),
    percentOfStake: z.string(),
    stake: z.string(),
    kind: z.string(),
    valueCopied: z.string(),
    languages: z.string(),
    actions: z.string(),
    incoming: z.string(),
    outgoing: z.string()
  }),
  accounts: z.object({
    accountOverview: z.string(),
    accountsCount: z.string()
  }),
  dashboard: z.object({
    header: z.string(),
    epoch: z.string(),
    slot: z.string(),
    circulatingSupply: z.string(),
    totalCurrency: z.string(),
    minaPrice: z.string(),
    minaMarketCap: z.string(),
    outOfSlots: z.string()
  }),
  staking: z.object({
    stakingCount: z.string()
  }),
  transactions: z.object({
    transactionDetails: z.string(),
    latestTransactions: z.string(),
    transactionsCount: z.string()
  })
})

export type Dictionary = z.infer<typeof localeSchema>