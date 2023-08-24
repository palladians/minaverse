'use client'

import { ColumnDef, flexRender } from '@tanstack/react-table'
import { ChevronDown, ExternalLinkIcon, EyeIcon, LinkIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useState } from 'react'

import { CopyValue } from '@/components/copy-value'
import { Pagination } from '@/components/pagination'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { AccountShort } from '@/data/accounts'
import { env } from '@/env.mjs'
import { useClipboard } from '@/lib/clipboard'
import { formatNumber } from '@/lib/number'
import { truncateString } from '@/lib/string'
import { useCommonTable } from '@/lib/table'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/app'

export const AccountsTable = ({
  data,
  accountsCount,
  currentPage,
  pagesCount,
  query
}: {
  data: AccountShort[]
  accountsCount: number
  currentPage: number
  pagesCount: number
  query: string | null
}) => {
  const router = useRouter()
  const [innerQuery, setInnerQuery] = useState(query)
  const setCurrentAccountPublicKey = useAppStore(
    (state) => state.setCurrentAccountPublicKey
  )
  const { copyValue } = useClipboard()

  const columns: ColumnDef<AccountShort>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'public_key',
      header: 'Public Key',
      cell: ({ row }) => (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="link"
              className="capitalize p-0 h-auto"
              onClick={() =>
                setCurrentAccountPublicKey(row.getValue('public_key'))
              }
            >
              {truncateString({
                value: row.getValue('public_key'),
                firstCharCount: 7,
                endCharCount: 6
              })}
            </Button>
          </TooltipTrigger>
          <TooltipContent className="flex">
            <CopyValue value={row.getValue('public_key')} />
          </TooltipContent>
        </Tooltip>
      )
    },
    {
      accessorKey: 'delegate',
      header: 'Delegate',
      cell: ({ row }) => (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="link"
              className="capitalize p-0 h-auto"
              onClick={() =>
                setCurrentAccountPublicKey(row.getValue('delegate'))
              }
            >
              {truncateString({
                value: row.getValue('delegate'),
                firstCharCount: 7,
                endCharCount: 6
              })}
            </Button>
          </TooltipTrigger>
          <TooltipContent className="flex">
            <CopyValue value={row.getValue('delegate')} />
          </TooltipContent>
        </Tooltip>
      )
    },
    {
      accessorKey: 'username',
      header: 'Username',
      cell: ({ row }) => <div>{row.getValue('username')}</div>
    },
    {
      accessorKey: 'nonce',
      header: 'Nonce',
      cell: ({ row }) => <div>{row.getValue('nonce')}</div>
    },
    {
      accessorKey: 'balance',
      header: 'Balance',
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue('balance'))
        const formatted = new Intl.NumberFormat('en-US').format(amount)
        return <div>{formatted} MINA</div>
      }
    },
    {
      accessorKey: 'actions',
      header: () => null,
      cell: ({ row }) => {
        return (
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setCurrentAccountPublicKey(row.getValue('public_key'))
              }
              data-testid="accounts__showPreview"
            >
              <EyeIcon size={16} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                router.push(`/accounts/${row.getValue('public_key')}`)
              }
              data-testid="accounts__openExtended"
            >
              <ExternalLinkIcon size={16} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                copyValue({
                  value: `${env.NEXT_PUBLIC_APP_URL}/accounts/${row.getValue(
                    'public_key'
                  )}`
                })
              }
              data-testid="accounts__copyLink"
            >
              <LinkIcon size={16} />
            </Button>
          </div>
        )
      }
    }
  ]

  const table = useCommonTable({ columns, data })

  const handleQuerySubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    router.push(`/accounts?search=${innerQuery}`)
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <h1 className="text-2xl" data-testid="staking__header">
            Accounts
          </h1>
          <p className="text-sm">({formatNumber(accountsCount)})</p>
        </div>
        <div className="flex gap-2">
          <form onSubmit={handleQuerySubmit}>
            <Input
              placeholder="Search with public key"
              defaultValue={innerQuery || ''}
              onChange={(event) => setInnerQuery(event.target.value)}
            />
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="hidden md:flex">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, i) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn([
                        'md:auto',
                        [0, 1, 6].includes(i)
                          ? 'table-cell'
                          : 'hidden md:table-cell'
                      ])}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell, i) => (
                    <TableCell
                      key={cell.id}
                      className={cn([
                        [0, 1, 6].includes(i)
                          ? 'table-cell'
                          : 'hidden md:table-cell'
                      ])}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination
        currentPage={currentPage}
        pagesCount={pagesCount}
        resource="accounts"
      />
    </div>
  )
}
