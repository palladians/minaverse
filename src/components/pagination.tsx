import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
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
        onClick={() => router.push(`/${resource}?page=0`)}
      >
        1
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => router.push(`/${resource}?page=${currentPage - 1}`)}
      >
        <ArrowLeftIcon size={16} />
      </Button>
      <Input
        className="w-24 h-9"
        defaultValue={currentPage + 1}
        onBlur={(event) => {
          const nextPage = Number(event.target.value)
          router.push(`/${resource}?page=${nextPage - 1}`)
        }}
      />
      <Button
        variant="outline"
        size="sm"
        onClick={() => router.push(`/${resource}?page=${currentPage + 1}`)}
      >
        <ArrowRightIcon size={16} />
      </Button>
      <Button
        size="sm"
        variant={currentPage === pagesCount - 1 ? 'secondary' : 'outline'}
        onClick={() => router.push(`/${resource}?page=${pagesCount - 1}`)}
      >
        {pagesCount}
      </Button>
    </div>
  )
}
