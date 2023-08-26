import './globals.css'
import '@total-typescript/ts-reset'

import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'

import { AccountSheet } from '@/components/accounts/account-sheet'
import { Commands } from '@/components/commands'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import Providers from '@/components/providers'
import { TransactionSheet } from '@/components/transactions/transaction-sheet'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

dayjs.extend(utc)
dayjs.extend(timezone)

export const metadata: Metadata = {
  title: 'Minaverse',
  description:
    'The truly open Mina Explorer. Get insight into the Mina Protocol.'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" />
        <script
          async
          src="https://ackee.sh.palladians.xyz/tracker.js"
          data-ackee-server="https://ackee.sh.palladians.xyz"
          data-ackee-domain-id="a9e7a3ac-8c7c-4f25-91b8-34975a33b9e7"
        />
        <meta property="og:image" content="https://minaverse.xyz/og.jpg" />
        <meta property="og:image:alt" content="About Acme" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </head>
      <body className={inter.className}>
        <Commands />
        <Providers>
          <div className="flex flex-col container min-h-screen">
            <AccountSheet />
            <TransactionSheet />
            <Navbar />
            <div className="flex flex-1 py-8">{children}</div>
            <Footer />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
