'use client'
import {
  ChevronDownIcon,
  CommandIcon,
  Moon,
  SearchIcon,
  Sun
} from 'lucide-react'
import NextImage from 'next/image'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
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

export const Navbar = () => {
  const { setTheme } = useTheme()
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
              <MenubarSeparator />
              <MenubarItem>Top epoch stakers</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>All ledgers</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>
              <span>zkApps</span>
              <ChevronDownIcon size={16} />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>All SNARKs</MenubarItem>
              <MenubarItem>SNARK fees</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>SNARK producers</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Snarketplace</MenubarItem>
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
      <div className="flex items-center gap-2">
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
        <Button variant="outline">
          <SearchIcon size={16} className="mr-2" />
          <CommandIcon size={16} />
          <span>K</span>
        </Button>
        <div className="hidden lg:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
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
    </div>
  )
}
