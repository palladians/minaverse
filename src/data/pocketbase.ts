import PocketBase from 'pocketbase'

import { env } from '@/env.mjs'

export const Collections = {
  reports: 'reports',
  restrictions: 'restrictions'
}

export const pb = new PocketBase(env.NEXT_PUBLIC_POCKETBASE_URL)
