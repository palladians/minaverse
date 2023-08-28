'use client'

import { useEffect } from 'react'

import { env } from '@/env.mjs'

export default function Error({
  error,
  reset
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    fetch(env.NEXT_PUBLIC_ERROR_REPORTING_URL, {
      method: 'POST',
      body: JSON.stringify({
        appId: env.NEXT_PUBLIC_ERROR_REPORTING_APP_ID,
        stacktrace: JSON.stringify(error, Object.getOwnPropertyNames(error))
      })
    })
  }, [error])

  return (
    <div>
      <h2 className="text-2xl text-semibold">Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
