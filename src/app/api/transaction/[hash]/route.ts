import { gql, request } from 'graphql-request'
import { type NextRequest, NextResponse } from 'next/server'

import { GqlUrl } from '@/data/api'
import { getNetwork } from '@/data/network'

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
  _: NextRequest,
  { params }: { params: { hash: string } }
) {
  const network = getNetwork()
  const explorerUrl = GqlUrl[network]
  const response = await request(explorerUrl, transactionQuery, {
    hash: params.hash
  })
  return NextResponse.json(response)
}
