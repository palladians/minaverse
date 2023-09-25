import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { Network } from '@/data/api'

type AppState = {
  network: Network | null
  locale: string | null
  commandsOpen: boolean
  currentAccountPublicKey: null | string
  currentTransactionHash: null | string
  settingsOpen: boolean
  myAccounts: string[]
}

type AppMutators = {
  setNetwork: (network: Network) => void
  setLocale: (locale: string) => void
  setCommandsOpen: (commandsOpen: boolean) => void
  setCurrentAccountPublicKey: (currentAccountPublicKey: string | null) => void
  setCurrentTransactionHash: (currentTransactionHash: string | null) => void
  setSettingsOpen: (settingsOpen: boolean) => void
  addAccount: (account: string) => void
  removeAccount: (account: string) => void
}

type AppStore = AppState & AppMutators

export const initialState: AppState = {
  commandsOpen: false,
  currentAccountPublicKey: null,
  currentTransactionHash: null,
  network: null,
  locale: null,
  settingsOpen: false,
  myAccounts: []
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      setNetwork: (network) => set({ network }),
      setLocale: (locale) => set({ locale }),
      setCommandsOpen: (commandsOpen) => set({ commandsOpen }),
      setCurrentAccountPublicKey: (currentAccountPublicKey) =>
        set({ currentAccountPublicKey }),
      setCurrentTransactionHash: (currentTransactionHash) =>
        set({ currentTransactionHash }),
      setSettingsOpen: (settingsOpen) => set({ settingsOpen }),
      addAccount: (account) => {
        const { myAccounts } = get()
        if (myAccounts.length > 2) return
        return set((state) => ({ myAccounts: [...state.myAccounts, account] }))
      },
      removeAccount: (account) =>
        set((state) => ({
          myAccounts: state.myAccounts.filter((a) => a !== account)
        }))
    }),
    {
      name: 'MinaverseAppStore',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ myAccounts: state.myAccounts })
    }
  )
)
