import { Collections, pb } from '@/data/pocketbase'

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
  return pb
    .collection(Collections.restrictions)
    .getList<RestrictionItem>(undefined, undefined, {
      filter: `publicKey='${publicKey}'`
    })
}
