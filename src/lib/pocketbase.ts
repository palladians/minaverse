import PocketBase from 'pocketbase'

import { env } from '@/env.mjs'

export const pocketbase = new PocketBase(env.NEXT_PUBLIC_CONTENT_API_URL)
