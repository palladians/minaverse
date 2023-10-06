import { NextRequest, NextResponse } from 'next/server'

import { fetchAccounts } from '@/data/accounts'
import { Network } from '@/data/api'
import { fetchTransactions } from '@/data/transactions'
import { pocketbase } from '@/lib/pocketbase'

export async function GET(request: NextRequest) {
  const networkRaw = request.headers.get('minaverse-network')
  const network = Network[networkRaw as never] || Network.MAINNET
  const url = new URL(request.url)
  const query = url.searchParams.get('query') || ''
  if (query.length < 3) {
    return NextResponse.json({ found: false, query })
  }
  const glossaryTerms = await pocketbase
    .collection('glossary_terms')
    .getFullList({ sort: 'term', filter: `term~'${query}'`, requestKey: null })
  if (glossaryTerms.length > 0) {
    return NextResponse.json({
      found: true,
      type: 'glossary',
      id: glossaryTerms[0].term
    })
  }
  if (query.length < 48) return NextResponse.json({ found: false, query })
  const accounts = await fetchAccounts({
    length: 1,
    start: 0,
    search: query,
    network
  })
  if (accounts.data.length > 0) {
    return NextResponse.json({
      found: true,
      type: 'accounts',
      id: accounts.data[0].public_key
    })
  }
  const transactions = await fetchTransactions({
    length: 1,
    start: 0,
    search: query,
    network
  })
  if (transactions.data.length > 0) {
    return NextResponse.json({
      found: true,
      type: 'transactions',
      id: transactions.data[0].hash
    })
  }
  return NextResponse.json({ found: false, query })
}
