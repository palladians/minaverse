import { ExplorerApiUrl } from '@/data/api'
import { getNetwork } from '@/data/network'

type Summary = {
  epoch: number
  slot: number
  circulatingSupply: string
  totalCurrency: string
}

export const fetchSummary = async () => {
  const explorerApiUrl = ExplorerApiUrl[getNetwork()]
  const summaryRequest = await fetch(`${explorerApiUrl}/summary`)
  return summaryRequest.json() as Promise<Summary>
}
