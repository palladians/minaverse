import './globals.css'
import '@total-typescript/ts-reset'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React, { Suspense } from 'react'

import { AccountSheet } from '@/components/accounts/account-sheet'
import { Commands } from '@/components/commands'
import { Footer } from '@/components/footer'
import { MobileNavigation } from '@/components/mobile-navigation'
import { Navbar } from '@/components/navbar'
import Providers from '@/components/providers'
import { SettingsSheet } from '@/components/settings/settings-sheet'
import { TransactionSheet } from '@/components/transactions/transaction-sheet'
import { Skeleton } from '@/components/ui/skeleton'
import { Toaster } from '@/components/ui/toaster'
import { getNetwork } from '@/data/network'
import { getLocale } from '@/lib/i18n/server'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Minaverse',
  description:
    'The truly open Mina Explorer. Get insight into the Mina Protocol.',
  manifest: '/manifest.json',
  themeColor: '#1e3a8a'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const network = getNetwork()
  const locale = getLocale()
  return (
    <html
      lang={locale}
      style={{ colorScheme: 'light' }}
      className={inter.className}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.svg" />
        <script
          async
          src="https://ackee.sh.palladians.xyz/tracker.js"
          data-ackee-server="https://ackee.sh.palladians.xyz"
          data-ackee-domain-id="a9e7a3ac-8c7c-4f25-91b8-34975a33b9e7"
        />
        <meta property="og:image" content="https://minaverse.xyz/og.jpg" />
        <meta property="og:image:alt" content="Minaverse Cover" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </head>
      <body>
        <div className="flex flex-col container min-h-screen pb-24 md:pb-0">
          <Providers locale={locale} network={network}>
            <Suspense fallback={<Skeleton className="w-full h-4" />}>
              <Commands />
            </Suspense>
            <Suspense fallback={<Skeleton className="w-full h-4" />}>
              <AccountSheet />
            </Suspense>
            <Suspense fallback={<Skeleton className="w-full h-4" />}>
              <TransactionSheet network={network} />
            </Suspense>
            <Suspense fallback={<Skeleton className="w-full h-4" />}>
              <SettingsSheet />
            </Suspense>
            <Suspense fallback={<Skeleton className="w-full h-4" />}>
              <Navbar />
            </Suspense>
            <div className="flex flex-1 py-8">{children}</div>
            <Suspense fallback={<Skeleton className="w-full h-4" />}>
              <Footer />
            </Suspense>
            <Suspense fallback={<Skeleton className="w-full h-4" />}>
              <MobileNavigation />
            </Suspense>
            <Suspense fallback={<Skeleton className="w-full h-4" />}>
              <Toaster />
            </Suspense>
          </Providers>
        </div>
      </body>
    </html>
  )
}
