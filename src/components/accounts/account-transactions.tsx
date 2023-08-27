import NextLink from 'next/link'
import React from 'react'

import { CopyValue } from '@/components/copy-value'
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
import { fetchAccountTransactions } from '@/data/accounts'
import { getNetwork } from '@/data/network'
import { formatDate } from '@/lib/date'
import { formatNumber } from '@/lib/number'
import { truncateString } from '@/lib/string'

export const AccountTransactions = async ({
  publicKey
}: {
  publicKey: string
}) => {
  const network = getNetwork()
  const accountTransactions = await fetchAccountTransactions({
    publicKey,
    limit: 100,
    network
  })
  const transactionsCount =
    accountTransactions.length < 100
      ? String(accountTransactions.length)
      : '100+'
  return (
    <TooltipProvider>
      <div className="flex flex-col gap-4 mt-4 text-lg">
        <h2 className="text-xl text-semibold">
          Transactions ({transactionsCount})
        </h2>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead />
                <TableHead>Hash</TableHead>
                <TableHead className="hidden md:table-cell">From</TableHead>
                <TableHead className="hidden md:table-cell">To</TableHead>
                <TableHead className="hidden md:table-cell">Amount</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accountTransactions.map((tx) => (
                <TableRow key={tx.hash}>
                  <TableCell>
                    <TransactionIndicator
                      kind={tx.kind}
                      incoming={publicKey === tx.to}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="link"
                          className="capitalize p-0 h-auto"
                          asChild
                        >
                          <NextLink href={`/transactions/${tx.hash}`}>
                            {truncateString({
                              value: tx.hash,
                              firstCharCount: 7,
                              endCharCount: 6
                            })}
                          </NextLink>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="flex">
                        <CopyValue value={tx.hash} />
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="link"
                          className="capitalize p-0 h-auto"
                          asChild
                        >
                          <NextLink href={`/accounts/${tx.from}`}>
                            {truncateString({
                              value: tx.from,
                              firstCharCount: 7,
                              endCharCount: 6
                            })}
                          </NextLink>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="flex">
                        <CopyValue value={tx.from} />
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="link"
                          className="capitalize p-0 h-auto"
                          asChild
                        >
                          <NextLink href={`/accounts/${tx.to}`}>
                            {truncateString({
                              value: tx.to,
                              firstCharCount: 7,
                              endCharCount: 6
                            })}
                          </NextLink>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="flex">
                        <CopyValue value={tx.to} />
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {formatNumber(Number(tx.amount) / 1_000_000_000)} MINA
                  </TableCell>
                  <TableCell className="text-right">
                    {formatDate(tx.dateTime)}
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
