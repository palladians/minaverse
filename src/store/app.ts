import { create } from 'zustand'

import { Network } from '@/data/api'

type AppState = {
  network: Network | null
  locale: string | null
  commandsOpen: boolean
  currentAccountPublicKey: null | string
  currentTransactionHash: null | string
  settingsOpen: boolean
}

type AppMutators = {
  setNetwork: (network: Network) => void
  setLocale: (locale: string) => void
  setCommandsOpen: (commandsOpen: boolean) => void
  setCurrentAccountPublicKey: (currentAccountPublicKey: string | null) => void
  setCurrentTransactionHash: (currentTransactionHash: string | null) => void
  setSettingsOpen: (settingsOpen: boolean) => void
}

type AppStore = AppState & AppMutators

export const initialState: AppState = {
  commandsOpen: false,
  currentAccountPublicKey: null,
  currentTransactionHash: null,
  network: null,
  locale: null,
  settingsOpen: false
}

export const useAppStore = create<AppStore>((set) => ({
  ...initialState,
  setNetwork: (network) => set({ network }),
  setLocale: (locale) => set({ locale }),
  setCommandsOpen: (commandsOpen) => set({ commandsOpen }),
  setCurrentAccountPublicKey: (currentAccountPublicKey) =>
    set({ currentAccountPublicKey }),
  setCurrentTransactionHash: (currentTransactionHash) =>
    set({ currentTransactionHash }),
  setSettingsOpen: (settingsOpen) => set({ settingsOpen })
}))
