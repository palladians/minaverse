'use client'

import NextLink from 'next/link'

import { CopyValue } from '@/components/copy-value'
import { SimpleSkeleton } from '@/components/simple-skeleton'
import { TransactionIndicator } from '@/components/transactions/transaction-indicator'
import { Button } from '@/components/ui/button'
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
import { useAccountTransactions } from '@/data/hooks'
import { formatDate } from '@/lib/date'
import { formatNumber } from '@/lib/number'
import { truncateString } from '@/lib/string'
import { useAppStore } from '@/store/app'

export const TransactionsWidget = () => {
  const publicKey = useAppStore((state) => state.currentAccountPublicKey)
  const { data: transactionsData, isLoading: transactionsLoading } =
    useAccountTransactions({
      publicKey,
      limit: 5
    })
  if (transactionsLoading) {
    return <SimpleSkeleton />
  }
  return (
    <TooltipProvider>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Latest transactions</h2>
          <Button variant="outline" asChild>
            <NextLink href={`/accounts/${publicKey}`}>See All</NextLink>
          </Button>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead />
                <TableHead className="hidden md:table-cell">Hash</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactionsData?.map((transaction) => (
                <TableRow key={transaction.hash}>
                  <TableCell>
                    <TransactionIndicator
                      kind={transaction.kind}
                      incoming={publicKey === transaction.to}
                    />
                  </TableCell>
                  <TableCell className="hidden md:table-cell font-medium">
                    <Tooltip>
                      <TooltipTrigger>
                        <NextLink href={`/transactions/${transaction.hash}`}>
                          {truncateString({
                            value: transaction.hash,
                            firstCharCount: 7,
                            endCharCount: 6
                          })}
                        </NextLink>
                      </TooltipTrigger>
                      <TooltipContent>
                        <CopyValue value={transaction.hash} />
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    {`${formatNumber(transaction.amount / 1_000_000_000)} MINA`}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatDate(transaction.dateTime)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </TooltipProvider>
  )
}
