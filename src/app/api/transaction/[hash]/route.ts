import { gql, request as gqlRequest } from 'graphql-request'
import { type NextRequest, NextResponse } from 'next/server'

import { GqlUrl, Network } from '@/data/api'

const transactionQuery = gql`
  query Transaction($hash: String!) {
    transaction(query: { hash: $hash }) {
      hash
      amount
      blockHeight
      canonical
      dateTime
      fee
      from
      to
      isDelegation
      kind
      memo
      nonce
      token
      failureReason
    }
  }
`

export async function GET(
  request: NextRequest,
  { params }: { params: { hash: string } }
) {
  const network = request.headers.get('minaverse-network') || Network.MAINNET
  const explorerUrl = GqlUrl[network as Network]
  const response = await gqlRequest(explorerUrl, transactionQuery, {
    hash: params.hash
  })
  return NextResponse.json(response)
}
