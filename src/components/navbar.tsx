'use client'
import { CommandIcon, MenuIcon } from 'lucide-react'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'

import { NetworkChoice } from '@/components/network-choice'
import { Button } from '@/components/ui/button'
import { Menubar } from '@/components/ui/menubar'
import { useAppStore } from '@/store/app'

export const Navbar = () => {
  const pathname = usePathname()
  const setCommandsOpen = useAppStore((state) => state.setCommandsOpen)
  return (
    <div className="flex md:grid grid-cols-[1fr,2fr,1fr] gap-2 justify-between items-center py-2">
      <div className="text-slate-900 dark:text-slate-50">
        <NextLink href="/" className="flex items-center">
          <div className="hidden md:flex">
            <NextImage
              src="/logo-dark.svg"
              width={180}
              height={20}
              alt="Logo"
              className="flex dark:hidden"
            />
            <NextImage
              src="/logo-light.svg"
              width={180}
              height={20}
              alt="Logo"
              className="hidden dark:flex"
            />
          </div>
          <NextImage
            src="/logo-compact.svg"
            width={40}
            height={22}
            alt="Logo"
            className="flex md:hidden"
          />
        </NextLink>
      </div>
      <div className="hidden md:flex justify-center items-center">
        <Menubar className="w-fit">
          <Button
            variant={pathname === '/accounts' ? 'secondary' : 'ghost'}
            size="sm"
            asChild
          >
            <NextLink href="/accounts">Accounts</NextLink>
          </Button>
          <Button
            variant={pathname === '/transactions' ? 'secondary' : 'ghost'}
            size="sm"
            asChild
          >
            <NextLink href="/transactions">Transactions</NextLink>
          </Button>
          <Button
            variant={pathname === '/staking' ? 'secondary' : 'ghost'}
            size="sm"
            asChild
          >
            <NextLink href="/staking">Staking</NextLink>
          </Button>
        </Menubar>
      </div>
      <div className="flex items-center justify-end gap-2">
        <div className="hidden lg:flex">
          <NetworkChoice />
        </div>
        <Button
          variant="outline"
          onClick={() => setCommandsOpen(true)}
          title="Search"
          className="flex items-center justify-center"
        >
          <MenuIcon size={16} />
          <div className="flex items-center hidden md:flex ml-2">
            <CommandIcon size={12} />
            <span>K</span>
          </div>
        </Button>
      </div>
    </div>
  )
}
