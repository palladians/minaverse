'use client'

import { ExternalLinkIcon, PlusIcon, TrashIcon } from 'lucide-react'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { fetchAccount, ProxyAccount } from '@/data/accounts'
import { useTranslation } from '@/lib/i18n/client'
import { formatNumber } from '@/lib/number'
import { truncateString } from '@/lib/string'
import { useAppStore } from '@/store/app'

import { SimpleSkeleton } from '../simple-skeleton'

type AddAccountForm = {
  publicKey: string
}

type AddAccountDialogProps = {
  open: boolean
  setOpen: (open: boolean) => void
}

const AddAccountDialog = ({ open, setOpen }: AddAccountDialogProps) => {
  const { t } = useTranslation()
  const addAccount = useAppStore((state) => state.addAccount)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AddAccountForm>({
    defaultValues: { publicKey: '' }
  })
  const onSubmit: SubmitHandler<AddAccountForm> = (data) => {
    addAccount(data.publicKey)
    setOpen(false)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('common.addAccount')}</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
          noValidate
        >
          <Input
            placeholder={t('common.publicKey')}
            {...register('publicKey', { minLength: 55, maxLength: 55 })}
          />
          {errors.publicKey && (
            <p className="text-red-700 text-sm">{t('common.invalidAddress')}</p>
          )}
          <Button variant="secondary" type="submit">
            {t('common.addAccount')}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

type AccountsTableProps = {
  accounts: ProxyAccount[]
}

const AccountsTable = ({ accounts }: AccountsTableProps) => {
  const { t } = useTranslation()
  const network = useAppStore((state) => state.network) || 'mainnet'
  const locale = useAppStore((state) => state.locale) || 'en'
  const removeAccount = useAppStore((state) => state.removeAccount)
  const parseBalance = (balance: string) => parseInt(balance) / 1_000_000_000
  const totalBalance = accounts.reduce(
    (acc, account) => acc + parseBalance(account.balance.total),
    0
  )
  const totalBalanceParsed = `${formatNumber({
    value: totalBalance,
    locale
  })} MINA`
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t('common.publicKey')}</TableHead>
          <TableHead className="hidden lg:table-cell">
            {t('common.balance')}
          </TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {accounts.map((account) => {
          const balance = `${formatNumber({
            value: parseBalance(account.balance.total),
            locale
          })} MINA`
          const accountUrl = `/${network}/accounts/${account.publicKey}`
          return (
            <TableRow key={account.publicKey}>
              <TableCell className="font-semibold">
                <NextLink href={accountUrl}>
                  {truncateString({
                    value: account.publicKey,
                    firstCharCount: 7,
                    endCharCount: 6
                  })}
                </NextLink>
              </TableCell>
              <TableCell className="hidden lg:table-cell">{balance}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button size="icon" variant="outline" asChild>
                    <NextLink href={accountUrl}>
                      <ExternalLinkIcon size={16} />
                    </NextLink>
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => removeAccount(account.publicKey)}
                  >
                    <TrashIcon size={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )
        })}
        {accounts.length > 0 ? (
          <TableRow className="hidden lg:table-row">
            <TableCell className="font-semibold">
              {t('common.totalBalance')}
            </TableCell>
            <TableCell>{totalBalanceParsed}</TableCell>
            <TableCell />
          </TableRow>
        ) : (
          <p className="p-4 font-semibold">{t('common.noAccounts')}</p>
        )}
      </TableBody>
    </Table>
  )
}

export const MyAccounts = () => {
  const { t } = useTranslation()
  const [fetching, setFetching] = useState(true)
  const [addAccountOpen, setAddAccountOpen] = useState(false)
  const [accountsData, setAccountsData] = useState<ProxyAccount[]>([])
  const network = useAppStore((state) => state.network) || 'mainnet'
  const myAccounts = useAppStore((state) => state.myAccounts)
  useEffect(() => {
    const fetchAccountsData = async () => {
      setFetching(true)
      const result = (await Promise.all(
        myAccounts.map(async (account) => {
          try {
            const data = await fetchAccount({ publicKey: account, network })
            return data
          } catch {
            return {
              publicKey: account,
              balance: {
                total: '0'
              }
            }
          }
        })
      )) as never[]
      setAccountsData(result)
      setFetching(false)
    }
    fetchAccountsData()
  }, [myAccounts, network])
  return (
    <Card className="flex flex-col p-4 gap-4">
      <AddAccountDialog open={addAccountOpen} setOpen={setAddAccountOpen} />
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">{t('common.myAccounts')}</h3>
        <Button
          variant="outline"
          disabled={myAccounts.length > 2}
          className="gap-2"
          onClick={() => setAddAccountOpen(true)}
        >
          <PlusIcon size={16} />
          <span>{t('common.addAccount')}</span>
        </Button>
      </div>
      {fetching ? (
        <SimpleSkeleton />
      ) : (
        <AccountsTable accounts={accountsData} />
      )}
    </Card>
  )
}
