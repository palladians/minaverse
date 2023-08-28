'use client'

import {
  ArrowLeftRightIcon,
  CoinsIcon,
  LayoutDashboardIcon,
  MenuIcon
} from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/app'

export const MobileNavigation = () => {
  const router = useRouter()
  const pathname = usePathname()
  const setCommandsOpen = useAppStore((state) => state.setCommandsOpen)
  const MENU_ITEMS = [
    {
      label: 'Dashboard',
      url: '/',
      icon: LayoutDashboardIcon,
      onClick: () => router.push('/')
    },
    {
      label: 'Transactions',
      url: '/transactions',
      icon: ArrowLeftRightIcon,
      onClick: () => router.push('/transactions')
    },
    {
      label: 'Staking',
      url: '/staking',
      icon: CoinsIcon,
      onClick: () => router.push('/staking')
    },
    {
      label: 'Menu',
      icon: MenuIcon,
      onClick: () => setCommandsOpen(true)
    }
  ]
  return (
    <div
      className="fixed flex md:hidden justify-around bg-background bottom-0 left-0 right-0 px-4 pt-2 border-t"
      style={{
        paddingBottom: 'calc(env(safe-area-inset-bottom, 1rem) + 0.75rem)'
      }}
    >
      {MENU_ITEMS.map((menuItem, i) => {
        const isActive = menuItem.url === pathname
        return (
          <Button
            key={i}
            variant="link"
            className={cn([
              'flex flex-col h-auto gap-1 py-1 px-2 justify-center items-center rounded-md decoration-transparent',
              isActive && 'text-blue-800 dark:text-blue-300'
            ])}
            onClick={menuItem.onClick}
          >
            <menuItem.icon size={20} />
            <div className="text-xs">{menuItem.label}</div>
          </Button>
        )
      })}
    </div>
  )
}
