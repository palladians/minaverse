'use client'

import { GithubIcon, MoonIcon, SunIcon, TwitterIcon } from 'lucide-react'
import NextImage from 'next/image'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export const Footer = () => {
  const { setTheme } = useTheme()
  return (
    <div className="flex flex-col md:flex-row justify-between md:items-center border-t py-8 gap-8">
      <div className="flex flex-col gap-4">
        <NextImage
          src="/logo.svg"
          width={120}
          height={20}
          alt="Logo"
          className="dark:invert opacity-50"
        />
        <p className="text-sm opacity-50">Truly open Mina Explorer.</p>
        <a
          href="https://palladians.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm opacity-50"
        >
          Created and maintained by Palladians.
        </a>
        <a
          href="https://pallad.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm opacity-50"
        >
          Pssst, need a Mina wallet? Check out Pallad.
        </a>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" title="Github" asChild>
          <a
            href="https://github.com/palladians/minaverse"
            target="_blank"
            rel="noreferrer noopener"
          >
            <GithubIcon size={20} />
          </a>
        </Button>
        <Button variant="outline" size="icon" title="Twitter" asChild>
          <a
            href="https://twitter.com/palladians_xyz"
            target="_blank"
            rel="noreferrer noopener"
          >
            <TwitterIcon size={20} />
          </a>
        </Button>
        <Button variant="outline" title="Discord" size="icon">
          <NextImage
            src="/discord.svg"
            alt="Discord"
            width={20}
            height={20}
            className="dark:invert"
          />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" title="Theme">
              <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme('light')}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
