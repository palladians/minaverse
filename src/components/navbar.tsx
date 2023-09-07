import NextImage from 'next/image'
import NextLink from 'next/link'

import { CommandsButton } from '@/components/commands-button'
import { NavbarLinks } from '@/components/navbar-links'
import { getNetwork } from '@/data/network'

export const Navbar = async () => {
  const network = getNetwork()
  return (
    <div className="hidden md:flex grid-cols-[1fr,2fr,1fr] gap-2 justify-between items-center py-2">
      <div className="text-slate-900 dark:text-slate-50 flex-1 inline-flex">
        <NextLink
          href="/"
          className="flex items-center"
          data-testid="navigation__dashboard"
        >
          <div className="hidden md:flex">
            <NextImage
              src="/logo-compact.svg"
              width={32}
              height={32}
              alt="Logo"
              className="flex dark:invert"
            />
          </div>
        </NextLink>
      </div>
      <NavbarLinks network={network} />
      <CommandsButton />
    </div>
  )
}
