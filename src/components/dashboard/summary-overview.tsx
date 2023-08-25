import { AlertTriangleIcon } from 'lucide-react'

import { EpochProgress } from '@/components/epoch-progress'
import { Card } from '@/components/ui/card'
import { fetchSummary } from '@/data/summary'
import { formatCurrencyCompact } from '@/lib/currency'

export const SummaryOverview = async () => {
  let fetchingError = false
  let summaryData
  try {
    summaryData = await fetchSummary()
  } catch {
    fetchingError = true
  }
  const DATA_ENTRIES = [
    { label: 'Epoch', value: summaryData?.epoch },
    { label: 'Slot', value: summaryData?.slot },
    {
      label: 'Circulating Supply',
      value: formatCurrencyCompact(summaryData?.circulatingSupply || 0)
    },
    {
      label: 'Total Currency',
      value: formatCurrencyCompact(summaryData?.totalCurrency || 0)
    }
  ]
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
      {DATA_ENTRIES.map((entry, i) => (
        <Card key={i} className="flex flex-col gap-1 flex-1 p-4">
          <h3 className="text-sm">{entry.label}</h3>
          {fetchingError ? (
            <AlertTriangleIcon />
          ) : (
            <p className="text-2xl">{entry.value}</p>
          )}
          <EpochProgress />
        </Card>
      ))}
    </div>
  )
}
