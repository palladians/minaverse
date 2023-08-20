import { create } from 'zustand'

type AppState = {
  commandsOpen: boolean
  currentAccountPublicKey: null | string
  currentTransactionHash: null | string
}

type AppMutators = {
  setCommandsOpen: (commandsOpen: boolean) => void
  setCurrentAccountPublicKey: (currentAccountPublicKey: string | null) => void
  setCurrentTransactionHash: (currentTransactionHash: string | null) => void
}

type AppStore = AppState & AppMutators

export const useAppStore = create<AppStore>((set) => ({
  commandsOpen: false,
  currentAccountPublicKey: null,
  currentTransactionHash: null,
  setCommandsOpen: (commandsOpen) => set({ commandsOpen }),
  setCurrentAccountPublicKey: (currentAccountPublicKey) =>
    set({ currentAccountPublicKey }),
  setCurrentTransactionHash: (currentTransactionHash) =>
    set({ currentTransactionHash })
}))
