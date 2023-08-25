'use client'

import { useRouter } from 'next/navigation'

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
  const network = useAppStore((state) => state.network)
  const setNetwork = useAppStore((state) => state.setNetwork)
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

  if (!network) return null

  return (
    <Select value={network} onValueChange={handleNetworkChange}>
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
