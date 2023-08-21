/* eslint-disable */
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
    NEXT_PUBLIC_MAINNET_EXPLORER_URL: z.string().min(1),
    NEXT_PUBLIC_MAINNET_GQL_URL: z.string().min(1),
    NEXT_PUBLIC_MAINNET_PROXY_URL: z.string().min(1),
    NEXT_PUBLIC_DEVNET_EXPLORER_URL: z.string().min(1),
    NEXT_PUBLIC_DEVNET_GQL_URL: z.string().min(1),
    NEXT_PUBLIC_DEVNET_PROXY_URL: z.string().min(1),
    NEXT_PUBLIC_BERKELEY_EXPLORER_URL: z.string().min(1),
    NEXT_PUBLIC_BERKELEY_GQL_URL: z.string().min(1),
    NEXT_PUBLIC_BERKELEY_PROXY_URL: z.string().min(1)
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_MAINNET_EXPLORER_URL:
      process.env.NEXT_PUBLIC_MAINNET_EXPLORER_URL,
    NEXT_PUBLIC_MAINNET_GQL_URL: process.env.NEXT_PUBLIC_MAINNET_GQL_URL,
    NEXT_PUBLIC_MAINNET_PROXY_URL: process.env.NEXT_PUBLIC_MAINNET_PROXY_URL,
    NEXT_PUBLIC_DEVNET_EXPLORER_URL:
      process.env.NEXT_PUBLIC_DEVNET_EXPLORER_URL,
    NEXT_PUBLIC_DEVNET_GQL_URL: process.env.NEXT_PUBLIC_DEVNET_GQL_URL,
    NEXT_PUBLIC_DEVNET_PROXY_URL: process.env.NEXT_PUBLIC_DEVNET_PROXY_URL,
    NEXT_PUBLIC_BERKELEY_EXPLORER_URL:
      process.env.NEXT_PUBLIC_BERKELEY_EXPLORER_URL,
    NEXT_PUBLIC_BERKELEY_GQL_URL: process.env.NEXT_PUBLIC_BERKELEY_GQL_URL,
    NEXT_PUBLIC_BERKELEY_PROXY_URL: process.env.NEXT_PUBLIC_BERKELEY_PROXY_URL
  }
})
