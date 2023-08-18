'use client'
import { ChevronDownIcon, CommandIcon, SearchIcon } from 'lucide-react'
import NextImage from 'next/image'

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
  const setCommandsOpen = useAppStore((state) => state.setCommandsOpen)
  return (
    <div className="flex md:grid grid-cols-[1fr,2fr,1fr] gap-2 justify-between items-center py-2">
      <div className="text-slate-900 dark:text-slate-50">
        <NextImage
          src="/logo.svg"
          width={140}
          height={24}
          alt="Logo"
          className="dark:invert"
        />
      </div>
      <div className="hidden md:flex justify-center items-center">
        <Menubar className="w-fit">
          <Button variant="ghost" size="sm">
            Accounts
          </Button>
          <MenubarMenu>
            <MenubarTrigger>
              <span>Transactions</span>
              <ChevronDownIcon size={16} />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>All transactions</MenubarItem>
              <MenubarItem>Pending Transactions</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>
              <span>Staking</span>
              <ChevronDownIcon size={16} />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Current epoch</MenubarItem>
              <MenubarItem>Next epoch</MenubarItem>
              <MenubarItem>Top epoch stakers</MenubarItem>
              <MenubarItem>All ledgers</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>
              <span>More</span>
              <ChevronDownIcon size={16} />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Blocks</MenubarItem>
              <MenubarItem>Non-canonical blocks</MenubarItem>
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
          <CommandIcon size={16} />
          <span>K</span>
        </Button>
      </div>
    </div>
  )
}
