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
import { useTranslation } from '@/lib/i18n/client'
import { useAppStore } from '@/store/app'

export const Commands = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const commandsOpen = useAppStore((state) => state.commandsOpen)
  const setCommandsOpen = useAppStore((state) => state.setCommandsOpen)
  const setSettingsOpen = useAppStore((state) => state.setSettingsOpen)

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

  const COMMAND_ITEMS = [
    {
      label: t('common.dashboard'),
      onSelect: () => router.push('/'),
      testId: 'commands__dashboard'
    },
    {
      label: t('common.accounts'),
      onSelect: () => router.push('/accounts'),
      testId: 'commands__accounts'
    },
    {
      label: t('common.transactions'),
      onSelect: () => router.push('/transactions'),
      testId: 'commands__transactions'
    },
    {
      label: t('common.staking'),
      onSelect: () => router.push('/staking'),
      testId: 'commands__staking'
    },
    {
      label: t('common.blog'),
      onSelect: () => router.push('/blog'),
      testId: 'commands__blog'
    },
    {
      label: t('common.settings'),
      onSelect: () => setSettingsOpen(true),
      testId: 'commands__settings'
    }
  ]

  return (
    <CommandDialog open={commandsOpen} onOpenChange={setCommandsOpen}>
      <CommandInput placeholder={t('common.typeCommand')} />
      <CommandList>
        <CommandEmpty>{t('common.noResults')}</CommandEmpty>
        {COMMAND_ITEMS.map((item, i) => (
          <CommandItem
            key={i}
            onSelect={() => handleSelect(item.onSelect)}
            data-testid={item.testId}
            className="cursor-pointer"
          >
            <ChevronRightIcon className="mr-2 h-4 w-4" />
            <span>{item.label}</span>
          </CommandItem>
        ))}
      </CommandList>
    </CommandDialog>
  )
}
