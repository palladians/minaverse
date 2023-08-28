'use client'

import { SettingsIcon } from 'lucide-react'
import NextImage from 'next/image'

import { ServiceLinks } from '@/components/service-links'
import { Socials } from '@/components/socials'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/store/app'

export const Footer = () => {
  const setSettingsOpen = useAppStore((state) => state.setSettingsOpen)
  return (
    <div className="hidden md:flex flex-col md:flex-row justify-between md:items-center border-t py-8 gap-8">
      <div className="flex flex-col gap-4">
        <NextImage
          src="/logo.svg"
          width={120}
          height={20}
          alt="Logo"
          className="dark:invert opacity-75"
        />
        <p className="text-sm opacity-75">The truly open Mina Explorer.</p>
        <a
          href="https://palladians.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm opacity-75"
        >
          Created and maintained by Palladians.
        </a>
        <a
          href="https://pallad.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm opacity-75"
        >
          Need a Mina wallet? Pallad 🦋 is coming soon.
        </a>
      </div>
      <div className="flex flex-col items-start md:items-end gap-2">
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
        <ServiceLinks />
      </div>
    </div>
  )
}
