import { gql, request as gqlRequest } from 'graphql-request'
import { type NextRequest, NextResponse } from 'next/server'

import { GqlUrl, Network } from '@/data/api'

const transactionsQuery = gql`
  query Transactions($publicKey: String!, $limit: Int) {
    transactions(
      query: { canonical: true, OR: [{ to: $publicKey }, { from: $publicKey }] }
      limit: $limit
      sortBy: DATETIME_DESC
    ) {
      amount
      to
      token
      kind
      isDelegation
      hash
      from
      fee
      failureReason
      dateTime
      blockHeight
    }
  }
`

export async function GET(
  request: NextRequest,
  { params }: { params: { publicKey: string } }
) {
  const network = request.headers.get('minaverse-network') || Network.MAINNET
  const { searchParams } = new URL(request.url)
  const limit = searchParams.get('limit')
  const explorerUrl = GqlUrl[network as Network]
  const response = await gqlRequest(explorerUrl, transactionsQuery, {
    publicKey: params.publicKey,
    limit: limit || 100
  })
  return NextResponse.json(response)
}
