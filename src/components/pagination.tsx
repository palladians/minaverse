import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface PaginationProps {
  currentPage: number
  pagesCount: number
  resource: string
}

export const Pagination = ({
  currentPage,
  pagesCount,
  resource
}: PaginationProps) => {
  const router = useRouter()
  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        variant={currentPage === 0 ? 'secondary' : 'outline'}
        size="sm"
        asChild
      >
        <NextLink href={`/${resource}?page=0`}>1</NextLink>
      </Button>
      <Button variant="outline" size="sm" asChild>
        <NextLink href={`/${resource}?page=${currentPage - 1}`}>
          <ArrowLeftIcon size={16} />
        </NextLink>
      </Button>
      <Input
        className="w-24 h-9"
        defaultValue={currentPage + 1}
        onBlur={(event) => {
          const nextPage = Number(event.target.value)
          router.push(`/${resource}?page=${nextPage - 1}`)
        }}
      />
      <Button variant="outline" size="sm" asChild>
        <NextLink href={`/${resource}?page=${currentPage + 1}`}>
          <ArrowRightIcon size={16} />
        </NextLink>
      </Button>
      <Button
        size="sm"
        variant={currentPage === pagesCount - 1 ? 'secondary' : 'outline'}
        asChild
      >
        <NextLink href={`/${resource}?page=${pagesCount - 1}`}>
          {pagesCount}
        </NextLink>
      </Button>
    </div>
  )
}
