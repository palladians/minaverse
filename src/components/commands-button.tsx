'use client'

import { CommandIcon, AlignRightIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAppStore } from '@/store/app'

const K_KEY = 'K'

export const CommandsButton = () => {
  const setCommandsOpen = useAppStore((state) => state.setCommandsOpen)
  return (
    <div className="flex items-center justify-end gap-2 flex-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setCommandsOpen(true)}
        title="Search"
        className="flex items-center gap-2 justify-center"
        data-testid="navigation__commands"
      >
        <AlignRightIcon size={24} />
        <Badge variant="outline">
          <CommandIcon size={12} />
          <span>{K_KEY}</span>
        </Badge>
      </Button>
    </div>
  )
}
