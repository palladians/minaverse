import { gql, request as gqlRequest } from 'graphql-request'
import { type NextRequest, NextResponse } from 'next/server'

import { Network, ProxyUrl } from '@/data/api'

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
  request: NextRequest,
  { params }: { params: { publicKey: string } }
) {
  const network = request.headers.get('minaverse-network') || Network.MAINNET
  const proxyUrl = ProxyUrl[network as Network]
  const response = await gqlRequest(proxyUrl, accountQuery, {
    publicKey: params.publicKey
  })
  return NextResponse.json(response)
}
