import { Dictionary } from '@/app/api/i18n/schema'

const en: Dictionary = {
  common: {
    title: 'The universe of Mina Protocol',
    dashboard: 'Dashboard',
    accounts: 'Accounts',
    transactions: 'Transactions',
    staking: 'Staking',
    settings: 'Settings',
    trulyOpen: 'The truly open Mina Explorer.',
    createdAndMaintained: 'Created and maintained by Palladians.',
    needWallet: 'Need a Mina wallet? Pallad \uD83E\uDD8B is coming soon.',
    privacyPolicy: 'Privacy Policy',
    termsAndConditions: 'Terms and Conditions',
    serviceStatus: 'Service Status',
    typeCommand: 'Type a command or search...',
    noResults: 'No results found.',
    publicKey: 'Public Key',
    balance: 'Balance',
    nonce: 'Nonce',
    delegate: 'Delegate',
    somethingWentWrong: 'Something went wrong!',
    tryAgain: 'Try again',
    hash: 'Hash',
    from: 'From',
    to: 'To',
    amount: 'Amount',
    date: 'Date',
    dateTime: 'Date',
    mina: 'MINA',
    columns: 'Columns',
    language: 'Language',
    environments: 'Environments',
    network: 'Network',
    theme: 'Theme',
    fiatCurrency: 'Fiat Currency',
    comingSoon: 'Coming Soon',
    version: 'Version',
    about: 'About',
    toggleTheme: 'Toggle Theme',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    seeAll: 'See All',
    close: 'Close',
    minaAmount: '{amount} MINA',
    username: 'Username',
    searchWithPublicKey: 'Search with public key',
    searchWithHash: 'Search with hash',
    name: 'Name',
    delegates: 'Delegates',
    blockChance: 'Chance',
    percentOfStake: '% of Stake',
    stake: 'Stake',
    kind: 'Kind',
    valueCopied: 'The value was copied to clipboard.',
    languages: 'Languages',
    actions: 'Actions',
    incoming: 'Incoming',
    outgoing: 'Outgoing',
    unknown: 'Unknown',
    menu: 'Menu'
  },
  accounts: {
    accountOverview: 'Account Overview',
    accountsCount: 'Accounts ({count})',
    warning: 'Warning!',
    accountSuspicious:
      'This account is marked as suspicious. Beware of scam attempts.'
  },
  accountReport: {
    trigger: 'Report',
    title: 'Report account',
    reason: 'Reason',
    reasonDescription: 'Please describe behavior of this account',
    evidence: 'Evidence attachment',
    submit: 'Submit report',
    toast: 'Your report has been sent'
  },
  dashboard: {
    header: 'Quick Stats',
    epoch: 'Epoch',
    slot: 'Slot',
    circulatingSupply: 'Circulating Supply',
    totalCurrency: 'Total Currency',
    minaPrice: 'Mina Price',
    minaMarketCap: 'Mina Market Cap',
    outOfSlots: 'Out of 7140'
  },
  staking: {
    stakingCount: 'Staking ({count})'
  },
  transactions: {
    transactionDetails: 'Transaction Details',
    latestTransactions: 'Latest transactions',
    transactionsCount: 'Transactions ({count})'
  }
} as const

export default en
