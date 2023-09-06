import { type NextRequest, NextResponse } from 'next/server'

export async function PATCH(request: NextRequest) {
  const body = (await request.json()) as { locale: string }
  const response = NextResponse.json({
    locale: body.locale
  })
  response.cookies.set({
    name: 'minaverse-locale',
    value: body.locale
  })
  return response
}
