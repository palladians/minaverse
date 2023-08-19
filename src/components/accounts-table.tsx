'use client'

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState
} from '@tanstack/react-table'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronDown,
  EyeIcon
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import * as React from 'react'

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
import { AccountShort } from '@/data/accounts'
import { formatNumber } from '@/lib/number'
import { truncateString } from '@/lib/string'
import { useAppStore } from '@/store/app'

export const AccountsTable = ({
  data,
  accountsCount,
  currentPage,
  pagesCount
}: {
  data: AccountShort[]
  accountsCount: number
  currentPage: number
  pagesCount: number
}) => {
  const router = useRouter()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const setCurrentAccountPublicKey = useAppStore(
    (state) => state.setCurrentAccountPublicKey
  )

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
        <Button
          variant="link"
          className="capitalize p-0 h-auto"
          onClick={() => setCurrentAccountPublicKey(row.getValue('public_key'))}
        >
          {truncateString({
            value: row.getValue('public_key'),
            firstCharCount: 7,
            endCharCount: 6
          })}
        </Button>
      )
    },
    {
      accessorKey: 'delegate',
      header: 'Delegate',
      cell: ({ row }) => (
        <div className="capitalize">
          {truncateString({
            value: row.getValue('delegate'),
            firstCharCount: 7,
            endCharCount: 6
          })}
        </div>
      )
    },
    {
      accessorKey: 'username',
      header: 'Username',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('username')}</div>
      )
    },
    {
      accessorKey: 'nonce',
      header: 'Nonce',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('nonce')}</div>
      )
    },
    {
      accessorKey: 'balance',
      header: () => <div>Balance</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue('balance'))
        const formatted = new Intl.NumberFormat('en-US').format(amount)
        return <div className="font-medium">{formatted} MINA</div>
      }
    },
    {
      accessorKey: 'actions',
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => {
        return (
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setCurrentAccountPublicKey(row.getValue('public_key'))
              }
            >
              <EyeIcon size={16} />
            </Button>
          </div>
        )
      }
    }
  ]

  const table = useReactTable({
    manualPagination: true,
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center py-4">
        <h1 className="text-2xl">Accounts ({formatNumber(accountsCount)})</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
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
                    onCheckedChange={(value) => column.toggleVisibility(value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
      <div className="flex items-center justify-end gap-2">
        <Button
          variant={currentPage === 0 ? 'secondary' : 'outline'}
          size="sm"
          onClick={() => router.push('/accounts?page=0')}
        >
          1
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push(`/accounts?page=${currentPage - 1}`)}
        >
          <ArrowLeftIcon size={16} />
        </Button>
        <Input
          className="w-24 h-9"
          defaultValue={currentPage + 1}
          onBlur={(event) => {
            const nextPage = Number(event.target.value)
            router.push(`/accounts?page=${nextPage - 1}`)
          }}
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push(`/accounts?page=${currentPage + 1}`)}
        >
          <ArrowRightIcon size={16} />
        </Button>
        <Button
          size="sm"
          variant={currentPage === pagesCount - 1 ? 'secondary' : 'outline'}
          onClick={() => router.push(`/accounts?page=${pagesCount - 1}`)}
        >
          {pagesCount}
        </Button>
      </div>
    </div>
  )
}
