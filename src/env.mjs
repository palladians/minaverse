/* eslint-disable no-undef */
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
    NEXT_PUBLIC_ERROR_REPORTING_URL: z.string().min(1),
    NEXT_PUBLIC_ERROR_REPORTING_APP_ID: z.string().min(1),
    NEXT_PUBLIC_POCKETBASE_SENTINEL_URL: z.string().min(1)
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_ERROR_REPORTING_URL:
      process.env.NEXT_PUBLIC_ERROR_REPORTING_URL,
    NEXT_PUBLIC_ERROR_REPORTING_APP_ID:
      process.env.NEXT_PUBLIC_ERROR_REPORTING_APP_ID,
    NEXT_PUBLIC_POCKETBASE_SENTINEL_URL:
      process.env.NEXT_PUBLIC_POCKETBASE_SENTINEL_URL
  },
  skipValidation: process.env.NODE_ENV === 'test'
})
