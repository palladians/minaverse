'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ThemeProvider } from 'next-themes'
import React, { ReactNode, useEffect } from 'react'

import { Network } from '@/data/api'
import { reportError } from '@/data/error'
import { setLocale } from '@/lib/i18n/common'
import { useAppStore } from '@/store/app'

const Providers = ({
  children,
  locale,
  network
}: {
  children: ReactNode
  locale: string
  network: string
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const nextLanguage = searchParams.get('lang')
  const setNetwork = useAppStore((state) => state.setNetwork)
  const setStoreLocale = useAppStore((state) => state.setLocale)
  const setCurrentTransactionHash = useAppStore(
    (state) => state.setCurrentTransactionHash
  )
  const setCurrentAccountPublicKey = useAppStore(
    (state) => state.setCurrentAccountPublicKey
  )
  useEffect(() => {
    if (!pathname) return
    setCurrentTransactionHash(null)
    setCurrentAccountPublicKey(null)
  }, [pathname])
  useEffect(() => {
    setNetwork(network as Network)
  }, [network])
  useEffect(() => {
    setStoreLocale(locale)
  }, [locale])
  useEffect(() => {
    const errorHandler = (event: ErrorEvent | PromiseRejectionEvent) =>
      reportError({ payload: event, context: { locale, network } })
    window.addEventListener('unhandledrejection', errorHandler)
    window.addEventListener('error', errorHandler)
    return () => {
      window.removeEventListener('unhandledrejection', errorHandler)
      window.removeEventListener('error', errorHandler)
    }
  }, [])
  useEffect(() => {
    const handleLanguageParam = async () => {
      if (!nextLanguage) return
      const correctLang = ['en', 'pl', 'tr', 'uk'].includes(nextLanguage)
      if (!correctLang) return
      await setLocale(nextLanguage)
      router.refresh()
    }
    handleLanguageParam()
  }, [nextLanguage])
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  )
}

export default Providers
