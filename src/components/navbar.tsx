'use client'
import { ChevronDownIcon, CommandIcon, SearchIcon } from 'lucide-react'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger
} from '@/components/ui/menubar'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useAppStore } from '@/store/app'

export const Navbar = () => {
  const pathname = usePathname()
  const setCommandsOpen = useAppStore((state) => state.setCommandsOpen)
  return (
    <div className="flex md:grid grid-cols-[1fr,2fr,1fr] gap-2 justify-between items-center py-2">
      <div className="text-slate-900 dark:text-slate-50">
        <NextLink href="/" className="inline-flex">
          <NextImage
            src="/logo.svg"
            width={140}
            height={24}
            alt="Logo"
            className="dark:invert"
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
          <Button variant="ghost" size="sm" asChild>
            <NextLink href="/transactions">Transactions</NextLink>
          </Button>
          <MenubarMenu>
            <MenubarTrigger className="cursor-pointer">
              <span>Staking</span>
              <ChevronDownIcon size={16} />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem className="cursor-pointer">
                Current epoch
              </MenubarItem>
              <MenubarItem className="cursor-pointer">Next epoch</MenubarItem>
              <MenubarItem className="cursor-pointer">
                Top epoch stakers
              </MenubarItem>
              <MenubarItem className="cursor-pointer">All ledgers</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className="cursor-pointer">
              <span>More</span>
              <ChevronDownIcon size={16} />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem className="cursor-pointer">Blocks</MenubarItem>
              <MenubarItem className="cursor-pointer">
                Non-canonical blocks
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
      <div className="flex items-center justify-end gap-2">
        <div className="hidden lg:flex">
          <Select defaultValue="mainnet">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Environment" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Environments</SelectLabel>
                <SelectItem value="mainnet">Mainnet</SelectItem>
                <SelectItem value="devnet">Devnet</SelectItem>
                <SelectItem value="berkeley">Berkeley</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button
          variant="outline"
          onClick={() => setCommandsOpen(true)}
          title="Search"
        >
          <SearchIcon size={16} className="mr-2" />
          <CommandIcon size={12} />
          <span>K</span>
        </Button>
      </div>
    </div>
  )
}
