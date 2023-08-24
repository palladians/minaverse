import { gql, request } from 'graphql-request'
import { type NextRequest, NextResponse } from 'next/server'

import { GqlUrl } from '@/data/api'
import { getNetwork } from '@/data/network'

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
  _: NextRequest,
  { params }: { params: { publicKey: string } }
) {
  const network = getNetwork()
  const explorerUrl = GqlUrl[network]
  const response = await request(explorerUrl, transactionsQuery, {
    publicKey: params.publicKey,
    limit: 100
  })
  return NextResponse.json(response)
}
