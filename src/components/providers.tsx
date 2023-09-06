'use client'

import { get as getCookie } from 'es-cookie'
import { usePathname } from 'next/navigation'
import { ThemeProvider } from 'next-themes'
import React, { ReactNode, useEffect } from 'react'

import { Network } from '@/data/api'
import { reportError } from '@/data/error'
import { useAppStore } from '@/store/app'

const Providers = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const setNetwork = useAppStore((state) => state.setNetwork)
  const setLocale = useAppStore((state) => state.setLocale)
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
    const persistedNetwork =
      (getCookie('minaverse-network') as Network) || Network.MAINNET
    setNetwork(persistedNetwork)
  }, [])
  useEffect(() => {
    const persistedLocale = getCookie('minaverse-locale') || 'en'
    setLocale(persistedLocale)
  }, [])
  useEffect(() => {
    window.addEventListener('unhandledrejection', reportError)
    window.addEventListener('error', reportError)
    return () => {
      window.removeEventListener('unhandledrejection', reportError)
      window.removeEventListener('error', reportError)
    }
  }, [])
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  )
}

export default Providers
