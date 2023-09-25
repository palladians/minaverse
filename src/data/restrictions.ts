import { SentinelCollections, sentinelPocketbase } from '@/lib/pocketbase'

type FetchRestrictionsProps = {
  publicKey: string
}

type RestrictionItem = {
  collectionId: string
  collectionName: string
  created: string
  id: string
  publicKey: string
  reason: string
  report: string
  updated: string
}

export const fetchRestrictions = async ({
  publicKey
}: FetchRestrictionsProps) => {
  return sentinelPocketbase
    .collection(SentinelCollections.restrictions)
    .getList<RestrictionItem>(undefined, undefined, {
      filter: `publicKey='${publicKey}'`
    })
}
