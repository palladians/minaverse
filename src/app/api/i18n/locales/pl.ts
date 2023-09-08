import { Dictionary } from '@/app/api/i18n/schema'

const pl: Dictionary = {
  common: {
    title: 'Uniwersum Mina Protocol',
    dashboard: 'Dashboard',
    accounts: 'Konta',
    transactions: 'Transakcje',
    staking: 'Staking',
    settings: 'Ustawienia',
    trulyOpen: 'Prawdziwie otwarty explorer Miny.',
    createdAndMaintained: 'Stworzone i utrzymywane przez Palladians.',
    needWallet: 'Potrzebujesz portfela do Miny? Pallad \uD83E\uDD8B nadchodzi.',
    privacyPolicy: 'Polityka prywatności',
    termsAndConditions: 'Regulamin świadczenia usług',
    serviceStatus: 'Status usługi',
    typeCommand: 'Wpisz komendę lub wyszukaj...',
    noResults: 'Brak wyników.',
    publicKey: 'Klucz publiczny',
    balance: 'Balans',
    nonce: 'Nonce',
    delegate: 'Delegat',
    somethingWentWrong: 'Coś poszło nie tak.',
    tryAgain: 'Spróbuj ponownie',
    hash: 'Hash',
    from: 'Od',
    to: 'Do',
    amount: 'Kwota',
    date: 'Data',
    dateTime: 'Data',
    mina: 'MINA',
    columns: 'Kolumny',
    language: 'Język',
    environments: 'Otoczenia',
    network: 'Sieć',
    theme: 'Styl',
    fiatCurrency: 'Waluta fiducjarna',
    comingSoon: 'Wkrótce',
    version: 'Wersja',
    about: 'O aplikacji',
    toggleTheme: 'Zmień styl',
    light: 'Jasny',
    dark: 'Ciemny',
    system: 'Systemowy',
    seeAll: 'Zobacz wszystkie',
    close: 'Zamknij',
    minaAmount: '{amount} MINA',
    username: 'Nazwa użytkownika',
    searchWithPublicKey: 'Wyszukaj przez klucz publiczny',
    searchWithHash: 'Wyszukaj przez hash',
    name: 'Nazwa',
    delegates: 'Delegujący',
    blockChance: 'Szansa',
    percentOfStake: 'Część stawki',
    stake: 'Stawka',
    kind: 'Rodzaj',
    valueCopied: 'Wartość skopiowana do schowka.',
    languages: 'Języki',
    actions: 'Akcje',
    incoming: 'Przychodzące',
    outgoing: 'Wychodzące',
    unknown: 'Nieznana',
    menu: 'Menu'
  },
  accounts: {
    accountOverview: 'Przegląd konta',
    accountsCount: 'Konta ({count})'
  },
  dashboard: {
    header: 'Statystyki',
    epoch: 'Epoka',
    slot: 'Slot',
    circulatingSupply: 'Podaż krążąca',
    totalCurrency: 'Całkowita waluta',
    minaPrice: 'Cena Miny',
    minaMarketCap: 'Kapitalizacja Miny',
    outOfSlots: 'Z 7140'
  },
  staking: {
    stakingCount: 'Staking ({count})'
  },
  transactions: {
    transactionDetails: 'Szczegóły transakcji',
    latestTransactions: 'Najnowsze transakcje',
    transactionsCount: 'Transakcje ({count})'
  }
} as const

export default pl
