import { SearchIcon } from 'lucide-react'
import React, { FormEvent } from 'react'

import { Input } from '@/components/ui/input'

interface TableSearchProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  placeholder: string
  defaultValue: string
  setValue: (value: string) => void
}

export const TableSearch = ({
  onSubmit,
  placeholder,
  defaultValue,
  setValue
}: TableSearchProps) => {
  return (
    <form onSubmit={onSubmit} className="relative">
      <SearchIcon
        size={16}
        className="absolute top-0 bottom-0 left-4 my-auto"
      />
      <Input
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={(event) => setValue(event.target.value)}
        className="w-72 pl-12"
      />
    </form>
  )
}
