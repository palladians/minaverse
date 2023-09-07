import { act, renderHook } from '@testing-library/react'

import { Network } from '@/data/api'
import { useAppStore } from '@/store/app'

describe('AppStore', () => {
  it('should update the locale', () => {
    const { result } = renderHook(() => useAppStore())
    act(() => {
      result.current.setLocale('pl')
    })
    expect(result.current.locale).toBe('pl')
  })

  it('should change the network', () => {
    const { result } = renderHook(() => useAppStore())
    act(() => {
      result.current.setNetwork(Network.DEVNET)
    })
    expect(result.current.network).toBe(Network.DEVNET)
  })

  it('should update the commandsOpen', () => {
    const { result } = renderHook(() => useAppStore())
    act(() => {
      result.current.setCommandsOpen(true)
    })
    expect(result.current.commandsOpen).toBe(true)
  })

  it('should update the currentAccountPublicKey', () => {
    const { result } = renderHook(() => useAppStore())
    act(() => {
      result.current.setCurrentAccountPublicKey(
        'B62qrQKS9ghd91shs73TCmBJRW9GzvTJK443DPx2YbqcyoLc56g1ny9'
      )
    })
    expect(result.current.currentAccountPublicKey).toBe(
      'B62qrQKS9ghd91shs73TCmBJRW9GzvTJK443DPx2YbqcyoLc56g1ny9'
    )
  })

  it('should update the currentTransactionHash', () => {
    const { result } = renderHook(() => useAppStore())
    act(() => {
      result.current.setCurrentTransactionHash(
        'Ckpa6CoGCqabVobJqRhMGqRGxLpQNr97cScD1oupPGGBHF2HuxcW3'
      )
    })
    expect(result.current.currentTransactionHash).toBe(
      'Ckpa6CoGCqabVobJqRhMGqRGxLpQNr97cScD1oupPGGBHF2HuxcW3'
    )
  })

  it('should update the settingsOpen', () => {
    const { result } = renderHook(() => useAppStore())
    act(() => {
      result.current.setSettingsOpen(true)
    })
    expect(result.current.settingsOpen).toBe(true)
  })
})
