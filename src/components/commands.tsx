'use client'

import { ChevronRightIcon } from 'lucide-react'
import * as React from 'react'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'

export const Commands = () => {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
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
