import { AlertTriangleIcon } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface AccountSuspiciousAlertProps {
  title: string
  description: string
  reason: string
}

export const AccountSuspiciousAlert = ({
  title,
  description,
  reason
}: AccountSuspiciousAlertProps) => {
  return (
    <Alert variant="destructive">
      <AlertTriangleIcon className="w-5 h-5" />
      <div className="flex flex-col gap-1">
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
        <AlertDescription>{reason}</AlertDescription>
      </div>
    </Alert>
  )
}
