'use client'

import { ChevronRightIcon } from 'lucide-react'
import React from 'react'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { useAppStore } from '@/store/app'

export const Commands = () => {
  const commandsOpen = useAppStore((state) => state.commandsOpen)
  const setCommandsOpen = useAppStore((state) => state.setCommandsOpen)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCommandsOpen(!commandsOpen)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <CommandDialog open={commandsOpen} onOpenChange={setCommandsOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Accounts">
          <CommandItem>
            <ChevronRightIcon className="mr-2 h-4 w-4" />
            <span>All accounts</span>
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Transactions">
          <CommandItem>
            <ChevronRightIcon className="mr-2 h-4 w-4" />
            <span>All transactions</span>
          </CommandItem>
          <CommandItem>
            <ChevronRightIcon className="mr-2 h-4 w-4" />
            <span>Pending transactions</span>
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Staking">
          <CommandItem>
            <ChevronRightIcon className="mr-2 h-4 w-4" />
            <span>Current epoch</span>
          </CommandItem>
          <CommandItem>
            <ChevronRightIcon className="mr-2 h-4 w-4" />
            <span>Next epoch</span>
          </CommandItem>
          <CommandItem>
            <ChevronRightIcon className="mr-2 h-4 w-4" />
            <span>Top epoch stakers</span>
          </CommandItem>
          <CommandItem>
            <ChevronRightIcon className="mr-2 h-4 w-4" />
            <span>All ledgers</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
