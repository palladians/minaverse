import { GithubIcon, TwitterIcon } from 'lucide-react'
import NextImage from 'next/image'

import { Button } from '@/components/ui/button'

export const Footer = () => {
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
        <Button variant="outline" size="icon" asChild>
          <a
            href="https://github.com/palladians/minaverse"
            target="_blank"
            rel="noreferrer noopener"
          >
            <GithubIcon size={20} />
          </a>
        </Button>
        <Button variant="outline" size="icon" asChild>
          <a
            href="https://twitter.com/palladians_xyz"
            target="_blank"
            rel="noreferrer noopener"
          >
            <TwitterIcon size={20} />
          </a>
        </Button>
        <Button variant="outline" size="icon">
          <NextImage
            src="/discord.svg"
            alt="Discord"
            width={20}
            height={20}
            className="dark:invert"
          />
        </Button>
      </div>
    </div>
  )
}
