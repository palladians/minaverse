import { Dictionary } from '@/app/api/i18n/schema'

const tr: Dictionary = {
  common: {
    title: 'Mina Protocol Evreni',
    dashboard: 'Gösterge ‘Paneli',
    accounts: 'Hesaplar',
    transactions: 'İşlemler',
    staking: 'Staking',
    settings: 'Ayarlar',
    trulyOpen: 'Gerçek anlamda açık Mina Exploreri.',
    createdAndMaintained:
      'Palladian‘lar tarafından geliştirildi ve sürdürülüyor.',
    needWallet:
      'Bir Mina cüzdanına mı ihtiyaç duyuyorsun? Pallad \uD83E\uDD8B yakında geliyor.',
    privacyPolicy: 'Gizlilik Politikası',
    termsAndConditions: 'Şartlar ve Koşullar',
    serviceStatus: 'Servis Durumu',
    typeCommand: 'Bir komut yazın veya arama yapın...',
    noResults: 'Sonuç bulunamadı.',
    publicKey: 'Public Key',
    balance: 'Bakiye',
    nonce: 'Nonce',
    delegate: 'Validatör',
    somethingWentWrong: 'Bir şeyler ters gitti!',
    tryAgain: 'Tekrar deneyin',
    hash: 'Hash',
    from: 'Gönderici',
    to: 'Alıcı',
    amount: 'Miktar',
    date: 'Tarih',
    dateTime: 'Tarih',
    mina: 'MINA',
    columns: 'Sütunlar',
    language: 'Dil',
    environments: 'Ağlar',
    network: 'Ağ',
    theme: 'Tema',
    fiatCurrency: 'Fiat Para Birimi',
    comingSoon: 'Yakında',
    version: 'Versiyon',
    about: 'Hakkında',
    toggleTheme: 'Toggle Tema',
    light: 'Aydınlık',
    dark: 'Karanlık',
    system: 'Sistem',
    seeAll: 'Hepsini Gör',
    close: 'Kapat',
    minaAmount: '{amount} MINA',
    username: 'Kullanıcı Adı',
    searchWithPublicKey: 'Public Key ile ara',
    searchWithHash: 'Hash ile ara',
    name: 'Ad',
    delegates: 'Delegatörler',
    blockChance: 'Şans',
    percentOfStake: 'Stake yüzdesi',
    stake: 'Stake',
    kind: 'Tür',
    valueCopied: 'Değer panoya kopyalandı.',
    languages: 'Diller',
    actions: 'Eylemler',
    incoming: 'Gelen',
    outgoing: 'Giden',
    unknown: 'Bilinmeyen',
    menu: 'Menü',
    blog: 'Blog',
    minRead: '{min} dk',
    myAccounts: 'Hesaplarım',
    addAccount: 'Hesap Ekle',
    totalBalance: 'Toplam Bakiye',
    noAccounts: 'Hesap bulunamadı',
    invalidAddress: 'Geçersiz adres',
    curatedBy: 'Küratör'
  },
  accounts: {
    accountOverview: 'Hesaba Genel Bakış',
    accountsCount: 'Hesaplar ({count})',
    warning: 'Uyarı!',
    accountSuspicious:
      'Bu hesap şüpheli olarak işaretlenmiştir. Dolandırıcılık girişimlerine dikkat edin.'
  },
  accountReport: {
    trigger: 'Rapor',
    title: 'Hesap raporu',
    reason: 'Sebep',
    reasonDescription: 'Lütfen bu hesabın davranışını açıklayın',
    evidence: 'Kanıt eki',
    submit: 'Rapor gönderin',
    toast: 'Raporunuz gönderildi'
  },
  dashboard: {
    header: 'Hızlı İstatistikler',
    epoch: 'Epoch',
    slot: 'Slot',
    circulatingSupply: 'Dolaşımdaki Arz',
    totalCurrency: 'Toplam Arz',
    minaPrice: 'Mina Fiyatı',
    minaMarketCap: 'Mina Piyasa Değeri',
    outOfSlots: '7140 dışında'
  },
  staking: {
    stakingCount: 'Staking ({count})'
  },
  transactions: {
    transactionDetails: 'İşlem Detayı',
    latestTransactions: 'Son işlemler',
    transactionsCount: 'İşlemler ({count})'
  }
} as const

export default tr
