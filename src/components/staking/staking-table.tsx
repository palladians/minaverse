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
import { Pool } from '@/data/staking'
import { useClipboard } from '@/lib/clipboard'
import { useTranslation } from '@/lib/i18n/client'
import { formatNumber } from '@/lib/number'
import { truncateString } from '@/lib/string'
import { useCommonTable } from '@/lib/table'
import { appUrl, AppUrls } from '@/lib/url'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/app'

type ExtendedPool = Pool & { publicKey: string }

export const StakingTable = ({
  data,
  poolsCount,
  currentPage,
  pagesCount,
  query,
  network,
  locale
}: {
  data: ExtendedPool[]
  poolsCount: number
  currentPage: number
  pagesCount: number
  query: string | null
  network: string
  locale: string
}) => {
  const { t } = useTranslation()
  const router = useRouter()
  const [innerQuery, setInnerQuery] = useState(query)
  const setCurrentAccountPublicKey = useAppStore(
    (state) => state.setCurrentAccountPublicKey
  )
  const { copyValue } = useClipboard()
  const poolsCountFormatted = `(${formatNumber({ value: poolsCount, locale })})`

  const columns: ColumnDef<Pool>[] = [
    {
      accessorKey: 'publicKey',
      header: t('common.delegate'),
      cell: ({ row }) => (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="link"
              className="capitalize p-0 h-auto"
              onClick={() =>
                setCurrentAccountPublicKey(row.getValue('publicKey'))
              }
            >
              {truncateString({
                value: row.getValue('publicKey'),
                firstCharCount: 7,
                endCharCount: 6
              })}
            </Button>
          </TooltipTrigger>
          <TooltipContent className="flex">
            <CopyValue value={row.getValue('publicKey')} />
          </TooltipContent>
        </Tooltip>
      )
    },
    {
      accessorKey: 'name',
      header: t('common.name'),
      cell: ({ row }) => <div>{row.getValue('name')}</div>
    },
    {
      accessorKey: 'delegates',
      header: t('common.delegates'),
      cell: ({ row }) => <div>{row.getValue('delegates')}</div>
    },
    {
      accessorKey: 'blockChance',
      header: t('common.blockChance'),
      cell: ({ row }) => <div>{row.getValue('blockChance')}</div>
    },
    {
      accessorKey: 'percentOfStake',
      header: t('common.percentOfStake'),
      cell: ({ row }) => <div>{row.getValue('percentOfStake')}</div>
    },
    {
      accessorKey: 'stake',
      header: t('common.stake'),
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue('stake'))
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
      accessorKey: 'actions',
      header: () => null,
      cell: ({ row }) => {
        return (
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setCurrentAccountPublicKey(row.getValue('publicKey'))
              }
              data-testid="staking__showPreview"
            >
              <EyeIcon size={16} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              data-testid="staking__openExtended"
            >
              <NextLink
                href={AppUrls.account({
                  network,
                  id: row.getValue('publicKey')
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
                    AppUrls.account({ network, id: row.getValue('publicKey') })
                  )
                })
              }
              data-testid="staking__copyLink"
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
    router.push(`/staking?search=${innerQuery}`)
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4">
          <div className="flex gap-2 items-center">
            <h1
              className="text-2xl font-semibold"
              data-testid="staking__header"
            >
              {t('common.staking')}
            </h1>
            <p className="text-sm">{poolsCountFormatted}</p>
          </div>
          <div className="flex gap-2">
            <TableSearch
              onSubmit={handleQuerySubmit}
              placeholder={t('common.searchWithPublicKey')}
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
                          [0, 6].includes(i)
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
                          [0, 6].includes(i)
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
          key={currentPage}
          currentPage={currentPage}
          pagesCount={pagesCount}
          resource="staking"
          network={network}
        />
      </div>
    </TooltipProvider>
  )
}
