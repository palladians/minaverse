'use client'
import { CommandIcon, MenuIcon } from 'lucide-react'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Menubar } from '@/components/ui/menubar'
import { useAppStore } from '@/store/app'

export const Navbar = () => {
  const pathname = usePathname()
  const setCommandsOpen = useAppStore((state) => state.setCommandsOpen)
  return (
    <div className="hidden md:flex grid-cols-[1fr,2fr,1fr] gap-2 justify-between items-center py-2">
      <div className="text-slate-900 dark:text-slate-50">
        <NextLink
          href="/"
          className="flex items-center"
          data-testid="navigation__dashboard"
        >
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
        <Menubar>
          <Button
            variant={pathname === '/accounts' ? 'secondary' : 'ghost'}
            size="sm"
            asChild
            data-testid="navigation__accounts"
          >
            <NextLink href="/accounts">Accounts</NextLink>
          </Button>
          <Button
            variant={pathname === '/transactions' ? 'secondary' : 'ghost'}
            size="sm"
            asChild
            data-testid="navigation__transactions"
          >
            <NextLink href="/transactions">Transactions</NextLink>
          </Button>
          <Button
            variant={pathname === '/staking' ? 'secondary' : 'ghost'}
            size="sm"
            asChild
            data-testid="navigation__staking"
          >
            <NextLink href="/staking">Staking</NextLink>
          </Button>
        </Menubar>
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => setCommandsOpen(true)}
          title="Search"
          className="flex items-center justify-center h-11"
          data-testid="navigation__commands"
        >
          <MenuIcon size={16} />
          <div className="items-center hidden md:flex ml-2">
            <CommandIcon size={12} />
            <span>K</span>
          </div>
        </Button>
      </div>
    </div>
  )
}
