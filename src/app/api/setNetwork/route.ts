import { type NextRequest, NextResponse } from 'next/server'

export async function PATCH(request: NextRequest) {
  const body = (await request.json()) as { network: string }
  const response = NextResponse.json({
    network: body.network
  })
  response.cookies.set({
    name: 'minaverse-network',
    value: body.network
  })
  return response
}
