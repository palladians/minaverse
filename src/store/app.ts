import { create } from 'zustand'

import { Network } from '@/data/api'

type AppState = {
  network: Network | null
  commandsOpen: boolean
  currentAccountPublicKey: null | string
  currentTransactionHash: null | string
}

type AppMutators = {
  setNetwork: (network: Network) => void
  setCommandsOpen: (commandsOpen: boolean) => void
  setCurrentAccountPublicKey: (currentAccountPublicKey: string | null) => void
  setCurrentTransactionHash: (currentTransactionHash: string | null) => void
}

type AppStore = AppState & AppMutators

export const useAppStore = create<AppStore>((set) => ({
  commandsOpen: false,
  currentAccountPublicKey: null,
  currentTransactionHash: null,
  network: null,
  setNetwork: (network) => set({ network }),
  setCommandsOpen: (commandsOpen) => set({ commandsOpen }),
  setCurrentAccountPublicKey: (currentAccountPublicKey) =>
    set({ currentAccountPublicKey }),
  setCurrentTransactionHash: (currentTransactionHash) =>
    set({ currentTransactionHash })
}))
