'use client'

import { useEffect } from 'react'

import { reportError } from '@/data/error'

export default function Error({
  error,
  reset
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    reportError(error)
  }, [error])

  return (
    <div>
      <h2 className="text-2xl text-semibold">Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
