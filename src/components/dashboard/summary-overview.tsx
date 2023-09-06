import { ProgressBar } from '@tremor/react'
import { AlertTriangleIcon } from 'lucide-react'

import { Card } from '@/components/ui/card'
import { fetchSummary } from '@/data/summary'
import { formatCurrencyCompact } from '@/lib/currency'
import { getT } from '@/lib/i18n/server'

const OF_7140 = '/7140'

export const SummaryOverview = async () => {
  const t = await getT()
  let fetchingError = false
  let summaryData
  try {
    summaryData = await fetchSummary()
  } catch {
    fetchingError = true
  }
  const epochProgress = summaryData?.slot
    ? (summaryData?.slot / 7140) * 100
    : null
  const DATA_ENTRIES = [
    {
      label: t('dashboard.epoch'),
      value: summaryData?.epoch,
      progress: epochProgress
    },
    {
      label: t('dashboard.slot'),
      value: (
        <div>
          {summaryData?.slot}
          <span className="font-light">{OF_7140}</span>
        </div>
      )
    },
    {
      label: t('dashboard.circulatingSupply'),
      value: formatCurrencyCompact(Number(summaryData?.circulatingSupply) || 0)
    },
    {
      label: t('dashboard.totalCurrency'),
      value: formatCurrencyCompact(Number(summaryData?.totalCurrency) || 0)
    }
  ]
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
      {DATA_ENTRIES.map((entry, i) => (
        <Card key={i} className="flex flex-col gap-2 flex-1 p-4">
          <h3 className="text-sm text-muted-foreground">{entry.label}</h3>
          {fetchingError ? (
            <AlertTriangleIcon />
          ) : (
            <div className="text-2xl font-semibold">{entry.value}</div>
          )}
          {entry?.progress && (
            <ProgressBar value={entry.progress} color="blue" />
          )}
        </Card>
      ))}
    </div>
  )
}
