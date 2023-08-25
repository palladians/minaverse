import { ArrowDownLeftIcon, ArrowUpRightIcon, CoinsIcon } from 'lucide-react'

interface TxSideIndicatorProps {
  kind: string
  incoming: boolean
}

export const TransactionIndicator = ({
  kind,
  incoming
}: TxSideIndicatorProps) => {
  return (
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
  )
}
