'use client'

import { ArrowDownLeftIcon, ArrowUpRightIcon, CoinsIcon } from 'lucide-react'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useTranslation } from '@/lib/i18n/client'

interface TxSideIndicatorProps {
  kind: string
  incoming: boolean
}

export const TransactionIndicator = ({
  kind,
  incoming
}: TxSideIndicatorProps) => {
  const { t } = useTranslation()
  const label =
    kind === 'PAYMENT'
      ? incoming
        ? t('common.incoming')
        : t('common.outgoing')
      : t('common.staking')
  return (
    <Tooltip>
      <TooltipTrigger>
        <div className="flex rounded-full dark:bg-blue-900 bg-blue-300 dark:text-blue-300 text-blue-900 w-8 h-8 justify-center items-center">
          {kind === 'PAYMENT' ? (
            incoming ? (
              <ArrowDownLeftIcon size={16} />
            ) : (
              <ArrowUpRightIcon size={16} />
            )
          ) : (
            <CoinsIcon size={16} />
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  )
}
