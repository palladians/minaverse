import { NextRequest, NextResponse } from 'next/server'

import { localeSchema } from '@/app/api/i18n/schema'

export async function GET(
  request: NextRequest,
  { params }: { params: { locale: string } }
) {
  const locale = params.locale || 'en'
  const localeFile = await import(`../locales/${locale}`)
  const translation = localeSchema.parse(localeFile.default)
  return NextResponse.json({ locale, translation })
}
