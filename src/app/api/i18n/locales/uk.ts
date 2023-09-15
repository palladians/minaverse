import { Dictionary } from '@/app/api/i18n/schema'

const uk: Dictionary = {
  common: {
    title: 'Всесвіт Mina Protocol',
    dashboard: 'Інформаційна панель',
    accounts: 'Аккаунти',
    transactions: 'Транзакції',
    staking: 'Стейкінг',
    settings: 'Параметри',
    trulyOpen: 'По-справжньому відкритий Mina Explorer.',
    createdAndMaintained: 'Створений та підтримується Palladians.',
    needWallet: 'Потрібен гаманець Mina? Pallad \uD83E\uDD8B вже незабаром.',
    privacyPolicy: 'Політика конфіденційності',
    termsAndConditions: 'Правила та умови',
    serviceStatus: 'Статус послуги',
    typeCommand: 'Введіть команду або запит...',
    noResults: 'Не знайдено результатів.',
    publicKey: 'Публічний Ключ',
    balance: 'Баланс',
    nonce: 'Nonce',
    delegate: 'Валідатор',
    somethingWentWrong: 'Щось пішло не так!',
    tryAgain: 'Спробуйте ще раз',
    hash: 'Хеш',
    from: 'Від',
    to: 'До',
    amount: 'Кількість',
    date: 'Дата',
    dateTime: 'Дата',
    mina: 'MINA',
    columns: 'Колонки',
    language: 'Мова',
    environments: 'Мережі',
    network: 'Мережа',
    theme: 'Тема',
    fiatCurrency: 'Фіатна валюта',
    comingSoon: 'Незабаром',
    version: 'Версія',
    about: 'Про застосунок',
    toggleTheme: 'Змінити тему',
    light: 'Світла',
    dark: 'Темна',
    system: 'Системна',
    seeAll: 'Переглянути все',
    close: 'Закрити',
    minaAmount: '{amount} MINA',
    username: 'Назва',
    searchWithPublicKey: 'Пошук за публічним ключем',
    searchWithHash: 'Пошук за хешем',
    name: 'Назва',
    delegates: 'Делегатори',
    blockChance: 'Шанс',
    percentOfStake: '% Стейку',
    stake: 'Стейк',
    kind: 'Тип',
    valueCopied: 'Скопійовано до буферу обміну.',
    languages: 'Мови',
    actions: 'Дії',
    incoming: 'Вхідна',
    outgoing: 'Вихідна',
    unknown: 'Невідомо',
    menu: 'Меню'
  },
  accounts: {
    accountOverview: 'Огляд аккаунта',
    accountsCount: 'Аккаунтів ({count})'
  },
  dashboard: {
    header: 'Коротка статистика',
    epoch: 'Епоха',
    slot: 'Слот',
    circulatingSupply: 'В обороті',
    totalCurrency: 'Усього валюти',
    minaPrice: 'Ціна Mina',
    minaMarketCap: 'Ринкова капіталізація Mina',
    outOfSlots: 'З 7140'
  },
  staking: {
    stakingCount: 'Стейкінг ({count})'
  },
  transactions: {
    transactionDetails: 'Деталі транзакції',
    latestTransactions: 'Останні транзакції',
    transactionsCount: 'Транзакцій ({count})'
  }
} as const

export default uk