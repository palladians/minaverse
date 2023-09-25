import { env } from '@/env.mjs'
import { pocketbase } from '@/lib/pocketbase'

interface ReportErrorProps {
  payload: Error | PromiseRejectionEvent | ErrorEvent
  context: Record<string, string>
}

export const reportError = ({ payload, context }: ReportErrorProps) => {
  return pocketbase.collection('error_reports').create({
    appId: env.NEXT_PUBLIC_APP_ID,
    stacktrace: JSON.stringify(payload, Object.getOwnPropertyNames(payload)),
    context
  })
}
