import { gql, request } from 'graphql-request'
import { type NextRequest, NextResponse } from 'next/server'

import { ProxyUrl } from '@/data/api'
import { getNetwork } from '@/data/network'

const accountQuery = gql`
  query Account($publicKey: PublicKey!) {
    account(publicKey: $publicKey) {
      balance {
        total
      }
      publicKey
      token
      nonce
      stakingActive
      epochDelegateAccount {
        publicKey
      }
    }
  }
`

export async function GET(
  _: NextRequest,
  { params }: { params: { publicKey: string } }
) {
  const network = getNetwork()
  const proxyUrl = ProxyUrl[network]
  const response = await request(proxyUrl, accountQuery, {
    publicKey: params.publicKey
  })
  return NextResponse.json(response)
}
