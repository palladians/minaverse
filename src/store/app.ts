import { create } from 'zustand'

type AppState = {
  commandsOpen: boolean
}

type AppMutators = {
  setCommandsOpen: (commandsOpen: boolean) => void
}

type AppStore = AppState & AppMutators

export const useAppStore = create<AppStore>((set) => ({
  commandsOpen: false,
  setCommandsOpen: (commandsOpen) => set({ commandsOpen })
}))
