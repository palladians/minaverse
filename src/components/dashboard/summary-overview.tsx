import { EpochProgress } from '@/components/epoch-progress'
import { Card } from '@/components/ui/card'
import { fetchSummary } from '@/data/summary'
import { formatCurrencyCompact } from '@/lib/currency'

export const SummaryOverview = async () => {
  const summaryData = await fetchSummary()
  const DATA_ENTRIES = [
    { label: 'Epoch', value: summaryData.epoch },
    { label: 'Slot', value: summaryData.slot },
    {
      label: 'Circulating Supply',
      value: formatCurrencyCompact(summaryData.circulatingSupply)
    },
    {
      label: 'Total Currency',
      value: formatCurrencyCompact(summaryData.totalCurrency)
    }
  ]
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
      {DATA_ENTRIES.map((entry, i) => (
        <Card key={i} className="flex flex-col gap-1 flex-1 p-4">
          <h3 className="text-sm">{entry.label}</h3>
          <p className="text-2xl">{entry.value}</p>
          <EpochProgress />
        </Card>
      ))}
    </div>
  )
}
