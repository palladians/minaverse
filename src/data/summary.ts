const SUMMARY_URL = 'https://api.minaexplorer.com/summary'

type Summary = {
  epoch: number
  slot: number
  circulatingSupply: number
  totalCurrency: number
}

export const fetchSummary = async () => {
  const summaryRequest = await fetch(SUMMARY_URL)
  return summaryRequest.json() as Promise<Summary>
}
