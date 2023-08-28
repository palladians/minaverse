import { GithubIcon, TwitterIcon } from 'lucide-react'
import NextImage from 'next/image'

import { Button } from '@/components/ui/button'

export const Socials = () => {
  return (
    <>
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
          href="https://twitter.com/minaverse_xyz"
          target="_blank"
          rel="noreferrer noopener"
        >
          <TwitterIcon size={20} />
        </a>
      </Button>
      <Button variant="outline" title="Discord" size="icon">
        <a
          href="https://discord.gg/ExzzfTGUnB"
          target="_blank"
          rel="noreferrer noopener"
        >
          <NextImage
            src="/discord.svg"
            alt="Discord"
            width={20}
            height={20}
            className="dark:invert"
          />
        </a>
      </Button>
    </>
  )
}
