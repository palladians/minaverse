import './globals.css'
import '@total-typescript/ts-reset'

import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'

import { AccountSheet } from '@/components/account-sheet'
import { Commands } from '@/components/commands'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import Providers from '@/components/providers'
import { TransactionSheet } from '@/components/transaction-sheet'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

dayjs.extend(utc)
dayjs.extend(timezone)

export const metadata: Metadata = {
  title: 'Minaverse',
  description:
    'The truly open Mina Explorer. Get insight into the Mina protocol.'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="favicon.svg" />
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
