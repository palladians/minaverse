const SUMMARY_URL = 'https://api.minaexplorer.com/summary'

export const fetchSummary = async () => {
  const summaryRequest = await fetch(SUMMARY_URL)
  const summaryData = await summaryRequest.json()
  return summaryData
}
