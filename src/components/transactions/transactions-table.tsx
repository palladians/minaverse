'use client'

import { ColumnDef, flexRender } from '@tanstack/react-table'
import camelcase from 'camelcase'
import { ChevronDown, ExternalLinkIcon, EyeIcon, LinkIcon } from 'lucide-react'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useState } from 'react'

import { CopyValue } from '@/components/copy-value'
import { Pagination } from '@/components/pagination'
import { TableSearch } from '@/components/table-search'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
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
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Transaction } from '@/data/transactions'
import { useClipboard } from '@/lib/clipboard'
import { formatDate } from '@/lib/date'
import { useTranslation } from '@/lib/i18n/client'
import { formatNumber } from '@/lib/number'
import { truncateString } from '@/lib/string'
import { useCommonTable } from '@/lib/table'
import { appUrl, AppUrls } from '@/lib/url'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/app'

export const TransactionsTable = ({
  data,
  transactionsCount,
  currentPage,
  pagesCount,
  query,
  network,
  locale
}: {
  data: Transaction[]
  transactionsCount: number
  currentPage: number
  pagesCount: number
  query: string | null
  network: string
  locale: string
}) => {
  const { t } = useTranslation()
  const [innerQuery, setInnerQuery] = useState(query)
  const router = useRouter()
  const setCurrentTransactionHash = useAppStore(
    (state) => state.setCurrentTransactionHash
  )
  const setCurrentAccountPublicKey = useAppStore(
    (state) => state.setCurrentAccountPublicKey
  )
  const { copyValue } = useClipboard()
  const transactionsCountFormatted = `(${formatNumber({
    value: transactionsCount,
    locale
  })})`

  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: 'hash',
      header: t('common.hash'),
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
      header: t('common.from'),
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
      header: t('common.to'),
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
      header: t('common.amount'),
      cell: ({ row }) => {
        const amount = Number(row.getValue('amount')) / 1_000_000_000
        return (
          <div>
            {t('common.minaAmount', {
              amount: formatNumber({ value: amount, locale })
            })}
          </div>
        )
      }
    },
    {
      accessorKey: 'dateTime',
      header: t('common.date'),
      cell: ({ row }) => (
        <div>
          {locale && formatDate({ date: row.getValue('dateTime'), locale })}
        </div>
      )
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
              data-testid="transactions__openExtended"
              asChild
            >
              <NextLink
                href={AppUrls.transaction({
                  network,
                  id: row.getValue('hash')
                })}
              >
                <ExternalLinkIcon size={16} />
              </NextLink>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                copyValue({
                  value: appUrl(
                    AppUrls.transaction({ network, id: row.getValue('hash') })
                  )
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
    <TooltipProvider>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4">
          <div className="flex gap-2 items-center">
            <h1
              className="text-2xl font-semibold"
              data-testid="transactions__header"
            >
              {t('common.transactions')}
            </h1>
            <p className="text-sm">{transactionsCountFormatted}</p>
          </div>
          <div className="flex gap-2">
            <TableSearch
              onSubmit={handleQuerySubmit}
              placeholder={t('common.searchWithHash')}
              defaultValue={innerQuery || ''}
              setValue={setInnerQuery}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="hidden md:flex">
                  {t('common.columns')} <ChevronDown className="ml-2 h-4 w-4" />
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
                        {t(`common.${camelcase(column.id)}`)}
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
                          [0, 5].includes(i)
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
                          [0, 5].includes(i)
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
                    {t('common.noResults')}
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
          network={network}
        />
      </div>
    </TooltipProvider>
  )
}
