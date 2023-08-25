'use client'

import { get as getCookie } from 'es-cookie'
import { usePathname } from 'next/navigation'
import { ThemeProvider } from 'next-themes'
import { Next13ProgressBar } from 'next13-progressbar'
import React, { ReactNode, useEffect } from 'react'

import { TooltipProvider } from '@/components/ui/tooltip'
import { Network } from '@/data/api'
import { useAppStore } from '@/store/app'

const Providers = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const setNetwork = useAppStore((state) => state.setNetwork)
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
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Next13ProgressBar color="#C873F0" options={{ showSpinner: false }} />
        {children}
      </TooltipProvider>
    </ThemeProvider>
  )
}

export default Providers
