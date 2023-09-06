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
    window.addEventListener('unhandledrejection', reportError)
    window.addEventListener('error', reportError)
    return () => {
      window.removeEventListener('unhandledrejection', reportError)
      window.removeEventListener('error', reportError)
    }
  }, [])
  useEffect(() => {
    const handleLanguageParam = async () => {
      if (!nextLanguage) return
      const correctLang = ['en', 'pl'].includes(nextLanguage)
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
