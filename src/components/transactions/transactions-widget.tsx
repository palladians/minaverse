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
import { useTranslation } from '@/lib/i18n/client'
import { formatNumber } from '@/lib/number'
import { truncateString } from '@/lib/string'
import { AppUrls } from '@/lib/url'
import { useAppStore } from '@/store/app'

export const TransactionsWidget = ({ network }: { network: string }) => {
  const { t } = useTranslation()
  const publicKey = useAppStore((state) => state.currentAccountPublicKey)
  const locale = useAppStore((state) => state.locale) || 'en'
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
          <h2 className="text-lg font-semibold">
            {t('transactions.latestTransactions')}
          </h2>
          <Button variant="outline" asChild>
            {publicKey && (
              <NextLink
                href={AppUrls.account({ network, id: publicKey })}
                data-testid="accountSheet__seeAllTransactions"
              >
                {t('common.seeAll')}
              </NextLink>
            )}
          </Button>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead />
                <TableHead className="hidden md:table-cell">
                  {t('common.hash')}
                </TableHead>
                <TableHead>{t('common.amount')}</TableHead>
                <TableHead className="text-right">{t('common.date')}</TableHead>
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
                        <NextLink
                          href={AppUrls.transaction({
                            network,
                            id: transaction.hash
                          })}
                        >
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
                    {t('common.minaAmount', {
                      amount: formatNumber({
                        value: transaction.amount / 1_000_000_000,
                        locale
                      })
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatDate({ date: transaction.dateTime, locale })}
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
