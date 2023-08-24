'use client'

import { get as getCookie } from 'es-cookie'
import { useEffect, useState } from 'react'

import { Network } from '@/data/api'

export const useNetworkClientSide = () => {
  const [network, setNetwork] = useState<Network | null>(null)
  useEffect(() => {
    const savedNetwork = getCookie('minaverse-network') as Network
    setNetwork(savedNetwork || Network.MAINNET)
  }, [])
  return { network }
}
