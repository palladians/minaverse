'use client'

import { SettingsIcon } from 'lucide-react'

import { Socials } from '@/components/socials'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/store/app'

export const FooterOptions = () => {
  const setSettingsOpen = useAppStore((state) => state.setSettingsOpen)
  return (
    <div className="flex gap-2">
      <Socials />
      <Button
        variant="outline"
        title="Settings"
        size="icon"
        onClick={() => setSettingsOpen(true)}
      >
        <SettingsIcon size={20} />
      </Button>
    </div>
  )
}
