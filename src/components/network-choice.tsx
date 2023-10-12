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
import { useTranslation } from '@/lib/i18n/client'
import { useAppStore } from '@/store/app'

const NETWORKS = [
  { label: 'Mainnet', value: 'mainnet' },
  { label: 'Devnet', value: 'devnet' },
  { label: 'Berkeley', value: 'berkeley' },
  { label: 'TestWorld 2.0', value: 'testworld' }
]

export const NetworkChoice = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const network = useAppStore((state) => state.network)
  const setNetwork = useAppStore((state) => state.setNetwork)
  const handleNetworkChange = async (network: string) => {
    setNetwork(network as Network)
    await fetch('/api/setNetwork', {
      method: 'PATCH',
      body: JSON.stringify({
        network
      }),
      credentials: 'include'
    })
    router.push('/')
    router.refresh()
  }

  return (
    <Select
      value={network || Network.MAINNET}
      onValueChange={handleNetworkChange}
    >
      <SelectTrigger className="w-[180px] h-11">
        <SelectValue placeholder="Select Environment" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t('common.environments')}</SelectLabel>
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
