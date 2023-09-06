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
import { getT } from '@/lib/i18n/server'
import { formatNumber } from '@/lib/number'
import { truncateString } from '@/lib/string'
import { AppUrls } from '@/lib/url'

export const AccountTransactions = async ({
  publicKey
}: {
  publicKey: string
}) => {
  const t = await getT()
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
        <h2 className="text-xl font-semibold">
          {t('transactions.transactionsCount', { count: transactionsCount })}
        </h2>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead />
                <TableHead>{t('common.hash')}</TableHead>
                <TableHead className="hidden md:table-cell">
                  {t('common.from')}
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  {t('common.to')}
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  {t('common.amount')}
                </TableHead>
                <TableHead className="text-right">{t('common.date')}</TableHead>
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
                          <NextLink
                            href={AppUrls.transaction({ network, id: tx.hash })}
                          >
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
                          <NextLink
                            href={AppUrls.account({ network, id: tx.from })}
                          >
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
                          <NextLink
                            href={AppUrls.account({ network, id: tx.to })}
                          >
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
                    {t('common.minaAmount', {
                      amount: formatNumber(Number(tx.amount) / 1_000_000_000)
                    })}
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
