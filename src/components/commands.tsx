'use client'

import { ChevronRightIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { useAppStore } from '@/store/app'

export const Commands = () => {
  const router = useRouter()
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

  const handleSelect = (cb: () => void) => {
    cb()
    setCommandsOpen(false)
  }

  return (
    <CommandDialog open={commandsOpen} onOpenChange={setCommandsOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandItem onSelect={() => handleSelect(() => router.push('/'))}>
          <ChevronRightIcon className="mr-2 h-4 w-4" />
          <span>Dashboard</span>
        </CommandItem>
        <CommandItem
          onSelect={() => handleSelect(() => router.push('/accounts'))}
        >
          <ChevronRightIcon className="mr-2 h-4 w-4" />
          <span>Accounts</span>
        </CommandItem>
        <CommandItem
          onSelect={() => handleSelect(() => router.push('/transactions'))}
        >
          <ChevronRightIcon className="mr-2 h-4 w-4" />
          <span>Transactions</span>
        </CommandItem>
        <CommandItem
          onSelect={() => handleSelect(() => router.push('/staking'))}
        >
          <ChevronRightIcon className="mr-2 h-4 w-4" />
          <span>Staking</span>
        </CommandItem>
      </CommandList>
    </CommandDialog>
  )
}
