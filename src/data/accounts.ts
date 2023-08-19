export type AccountShort = {
  pk: string
  balance: number
  delegate: string
  token: number
  nonce: number
  receipt_chain_hash: string
  voting_for: string
  public_key: string
  username: string
}

type StakingAccount = {
  pk: string
  balance: string
  delegate: string
  token: number
  receipt_chain_hash: string
  voting_for: string
  nonce: 0
  epoch: 0
  chainId: string
  public_key: string
}

export type AccountFull = {
  publicKey: string
  balance: {
    total: string
    unknown: string
    lockedBalance: number
  }
  nonce: number
  receiptChainHash: string
  delegate: string
  votingFor: string
  totalTx: number
  totalBlocks: number
  totalSnarks: number
  countPendingTransactions: number
  username: string
  epochStakingAccount: StakingAccount[]
  nextEpochStakingAccount: StakingAccount[]
  epochDelegators: StakingAccount[]
  nextEpochDelegators: StakingAccount[]
  epochTotalStakingBalance: string
  nextEpochTotalStakingBalance: string
}

export type AccountsResponse = {
  draw: number
  recordsTotal: number
  recordsFiltered: number
  data: AccountShort[]
}

export type AccountResponse = {
  account: AccountFull
  status: {
    syncStatus: string
    blockchainLength: number
  }
}

interface FetchAccountsProps {
  length?: number
  start?: number
}

export const fetchAccounts = async ({
  length,
  start
}: FetchAccountsProps): Promise<AccountsResponse> => {
  const accountsUrl = new URL('https://minaexplorer.com/all-accounts')
  accountsUrl.searchParams.set('length', String(length || 20))
  accountsUrl.searchParams.set('start', String(start || 0))
  const accountsRequest = await fetch(accountsUrl)
  return accountsRequest.json() as Promise<AccountsResponse>
}

export const fetchAccount = async ({ publicKey }: { publicKey: string }) => {
  const accountUrl = new URL(
    `https://api.minaexplorer.com/accounts/${publicKey}`
  )
  const accountRequest = await fetch(accountUrl)
  return accountRequest.json() as Promise<AccountResponse>
}
