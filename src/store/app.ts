import { create } from 'zustand'

type AppState = {
  commandsOpen: boolean
  currentAccountPublicKey: null | string
}

type AppMutators = {
  setCommandsOpen: (commandsOpen: boolean) => void
  setCurrentAccountPublicKey: (currentAccountPublicKey: string | null) => void
}

type AppStore = AppState & AppMutators

export const useAppStore = create<AppStore>((set) => ({
  commandsOpen: false,
  currentAccountPublicKey: null,
  setCommandsOpen: (commandsOpen) => set({ commandsOpen }),
  setCurrentAccountPublicKey: (currentAccountPublicKey) =>
    set({ currentAccountPublicKey })
}))
