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
import { Transaction } from '@/data/transactions'
import { env } from '@/env.mjs'
import { useClipboard } from '@/lib/clipboard'
import { formatDate } from '@/lib/date'
import { formatNumber } from '@/lib/number'
import { truncateString } from '@/lib/string'
import { useCommonTable } from '@/lib/table'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/app'

export const TransactionsTable = ({
  data,
  transactionsCount,
  currentPage,
  pagesCount,
  query
}: {
  data: Transaction[]
  transactionsCount: number
  currentPage: number
  pagesCount: number
  query: string | null
}) => {
  const [innerQuery, setInnerQuery] = useState(query)
  const router = useRouter()
  const setCurrentTransactionHash = useAppStore(
    (state) => state.setCurrentTransactionHash
  )
  const setCurrentAccountPublicKey = useAppStore(
    (state) => state.setCurrentAccountPublicKey
  )
  const { copyValue } = useClipboard()

  const columns: ColumnDef<Transaction>[] = [
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
      accessorKey: 'hash',
      header: 'Hash',
      cell: ({ row }) => (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="link"
              className="capitalize p-0 h-auto"
              onClick={() => setCurrentTransactionHash(row.getValue('hash'))}
            >
              {truncateString({
                value: row.getValue('hash'),
                firstCharCount: 7,
                endCharCount: 6
              })}
            </Button>
          </TooltipTrigger>
          <TooltipContent className="flex">
            <CopyValue value={row.getValue('hash')} />
          </TooltipContent>
        </Tooltip>
      )
    },
    {
      accessorKey: 'from',
      header: 'From',
      cell: ({ row }) => (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="link"
              className="capitalize p-0 h-auto"
              onClick={() => setCurrentAccountPublicKey(row.getValue('from'))}
            >
              {truncateString({
                value: row.getValue('from'),
                firstCharCount: 7,
                endCharCount: 6
              })}
            </Button>
          </TooltipTrigger>
          <TooltipContent className="flex">
            <CopyValue value={row.getValue('from')} />
          </TooltipContent>
        </Tooltip>
      )
    },
    {
      accessorKey: 'to',
      header: 'To',
      cell: ({ row }) => (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="link"
              className="capitalize p-0 h-auto"
              onClick={() => setCurrentAccountPublicKey(row.getValue('to'))}
            >
              {truncateString({
                value: row.getValue('to'),
                firstCharCount: 7,
                endCharCount: 6
              })}
            </Button>
          </TooltipTrigger>
          <TooltipContent className="flex">
            <CopyValue value={row.getValue('to')} />
          </TooltipContent>
        </Tooltip>
      )
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue('amount'))
        const formatted = new Intl.NumberFormat('en-US').format(amount)
        return <div>{formatted} MINA</div>
      }
    },
    {
      accessorKey: 'dateTime',
      header: 'Date',
      cell: ({ row }) => <div>{formatDate(row.getValue('dateTime'))}</div>
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
              onClick={() => setCurrentTransactionHash(row.getValue('hash'))}
              data-testid="transactions__showPreview"
            >
              <EyeIcon size={16} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                router.push(`/transactions/${row.getValue('hash')}`)
              }
              data-testid="transactions__openExtended"
            >
              <ExternalLinkIcon size={16} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                copyValue({
                  value: `${
                    env.NEXT_PUBLIC_APP_URL
                  }/transactions/${row.getValue('hash')}`
                })
              }
              data-testid="transactions__copyLink"
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
    router.push(`/transactions?search=${innerQuery}`)
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <h1 className="text-2xl" data-testid="transactions__header">
            Transactions
          </h1>
          <p className="text-sm">({formatNumber(transactionsCount)})</p>
        </div>
        <div className="flex gap-2">
          <form onSubmit={handleQuerySubmit}>
            <Input
              placeholder="Search with hash"
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
        resource="transactions"
      />
    </div>
  )
}
