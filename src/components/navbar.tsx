import NextImage from 'next/image'
import NextLink from 'next/link'

import { CommandsButton } from '@/components/commands-button'
import { NavbarLinks } from '@/components/navbar-links'
import { getNetwork } from '@/data/network'

export const Navbar = async () => {
  const network = getNetwork()
  return (
    <div className="hidden bg-white dark:bg-slate-950 bg-opacity-50 backdrop-blur-lg md:flex fixed top-0 left-0 right-0 py-2 border-b z-10">
      <div className="container grid-cols-[1fr,2fr,1fr] gap-2 justify-between items-center flex">
        <div className="flex gap-8">
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
        <div className="flex gap-8 items-center">
          <NavbarLinks network={network} />
          <CommandsButton />
        </div>
      </div>
    </div>
  )
}
