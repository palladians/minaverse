import { env } from '@/env.mjs'

export const reportError = (
  payload: Error | PromiseRejectionEvent | ErrorEvent
) => {
  return fetch(env.NEXT_PUBLIC_ERROR_REPORTING_URL, {
    method: 'POST',
    body: JSON.stringify({
      appId: env.NEXT_PUBLIC_ERROR_REPORTING_APP_ID,
      stacktrace: JSON.stringify(payload, Object.getOwnPropertyNames(payload))
    })
  })
}
