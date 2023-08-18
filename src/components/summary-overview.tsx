import { Card } from '@/components/ui/card'
import { fetchSummary } from '@/data/summary'
import { formatCurrencyCompact } from '@/lib/currency'

export const SummaryOverview = async () => {
  const summaryData = await fetchSummary()
  return (
    <div className="flex gap-8">
      <Card className="flex flex-col gap-1 flex-1 p-4">
        <h3 className="text-sm">Epoch</h3>
        <p className="text-2xl">{summaryData.epoch}</p>
      </Card>
      <Card className="flex flex-col gap-1 flex-1 p-4">
        <h3 className="text-sm">Slot</h3>
        <p className="text-2xl">{summaryData.slot}</p>
      </Card>
      <Card className="flex flex-col gap-1 flex-1 p-4">
        <h3 className="text-sm">Circulating Supply</h3>
        <p className="text-2xl">
          {formatCurrencyCompact(summaryData.circulatingSupply)}
        </p>
      </Card>
      <Card className="flex flex-col gap-1 flex-1 p-4">
        <h3 className="text-sm">Total Currency</h3>
        <p className="text-2xl">
          {formatCurrencyCompact(summaryData.totalCurrency)}
        </p>
      </Card>
    </div>
  )
}
