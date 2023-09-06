'use client'

import { CommandIcon, MenuIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useAppStore } from '@/store/app'

const K_KEY = 'K'

export const CommandsButton = () => {
  const setCommandsOpen = useAppStore((state) => state.setCommandsOpen)
  return (
    <div className="flex items-center justify-end gap-2 flex-1">
      <Button
        variant="outline"
        onClick={() => setCommandsOpen(true)}
        title="Search"
        className="flex items-center justify-center h-11"
        data-testid="navigation__commands"
      >
        <MenuIcon size={16} />
        <div className="items-center hidden md:flex ml-2 font-semibold">
          <CommandIcon size={12} />
          <span>{K_KEY}</span>
        </div>
      </Button>
    </div>
  )
}
