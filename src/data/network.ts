import { cookies } from 'next/headers'

import { Network } from '@/data/api'

export const getNetwork = (): Network => {
  const network = cookies().get('minaverse-network')?.value || 'mainnet'
  return network as Network
}
