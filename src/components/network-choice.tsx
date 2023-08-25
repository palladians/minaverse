'use client'

import { get as getCookie } from 'es-cookie'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Network } from '@/data/api'
import { useAppStore } from '@/store/app'

const NETWORKS = [
  { label: 'Mainnet', value: 'mainnet' },
  { label: 'Devnet', value: 'devnet' },
  { label: 'Berkeley', value: 'berkeley' }
]

export const NetworkChoice = () => {
  const router = useRouter()
  const setNetwork = useAppStore((state) => state.setNetwork)
  const [defaultNetwork, setDefaultNetwork] = useState<string | null>(null)
  const handleNetworkChange = async (network: string) => {
    setNetwork(network as Network)
    await fetch('/setNetwork', {
      method: 'PATCH',
      body: JSON.stringify({
        network
      }),
      credentials: 'include'
    })
    router.refresh()
  }

  useEffect(() => {
    const network = getCookie('minaverse-network') || 'mainnet'
    setDefaultNetwork(network)
  }, [])

  if (!defaultNetwork) return null

  return (
    <Select defaultValue={defaultNetwork} onValueChange={handleNetworkChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Environment" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Environments</SelectLabel>
          {NETWORKS.map((network) => (
            <SelectItem key={network.value} value={network.value}>
              {network.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
