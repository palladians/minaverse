'use client'

import { ChevronRightIcon } from 'lucide-react'
import { matchSorter } from 'match-sorter'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

import {
  CommandDialog,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { SearchResults } from '@/data/api'
import { useTranslation } from '@/lib/i18n/client'
import { truncateString } from '@/lib/string'
import { appUrl } from '@/lib/url'
import { useAppStore } from '@/store/app'

import { SimpleSkeleton } from './simple-skeleton'

export const Commands = () => {
  const [fetching, setFetching] = useState(false)
  const [query, setQuery] = useState<string | undefined>(undefined)
  const [debouncedQuery] = useDebounce(query, 500)
  const [searchResult, setSearchResult] = useState<SearchResults | null>(null)
  const network = useAppStore((state) => state.network)
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
      label: t('common.glossary'),
      onSelect: () => router.push('/glossary'),
      testId: 'commands__glossary'
    },
    {
      label: t('common.settings'),
      onSelect: () => setSettingsOpen(true),
      testId: 'commands__settings'
    }
  ]

  useEffect(() => {
    const fetchSearchResult = async () => {
      if (!debouncedQuery) return setSearchResult(null)
      if (debouncedQuery.length < 3) return setSearchResult(null)
      setFetching(true)
      const request = await fetch(appUrl(`/api/search?query=${debouncedQuery}`))
      const result = await request.json()
      setSearchResult(result as never)
      setFetching(false)
    }
    fetchSearchResult()
  }, [debouncedQuery])

  const filteredItems = matchSorter(COMMAND_ITEMS, query || '', {
    keys: ['label']
  })

  const truncatedId =
    searchResult &&
    truncateString({
      value: searchResult.id || '',
      firstCharCount: 7,
      endCharCount: 6
    })

  const searchResultLabel =
    searchResult &&
    ['accounts', 'transactions'].includes(searchResult.type || '')
      ? `${searchResult.type} (${truncatedId})`
      : `${searchResult?.type} (${searchResult?.id})`

  const searchResultUrl =
    searchResult &&
    ['accounts', 'transactions'].includes(searchResult.type || '')
      ? `/${network}/${searchResult.type}/${searchResult.id}`
      : `/glossary?search=${searchResult?.id}`

  return (
    <CommandDialog open={commandsOpen} onOpenChange={setCommandsOpen}>
      <CommandInput
        placeholder={t('common.typeCommand')}
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        {fetching && (
          <div className="p-2">
            <SimpleSkeleton />
          </div>
        )}
        {searchResult?.found && (
          <CommandItem
            onSelect={() =>
              handleSelect(() => router.push(searchResultUrl || ''))
            }
            data-testid="commands__searchResult"
            className="cursor-pointer"
          >
            <ChevronRightIcon className="mr-2 h-4 w-4" />
            <span className="capitalize">{searchResultLabel}</span>
          </CommandItem>
        )}
        {filteredItems.map((item, i) => (
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
