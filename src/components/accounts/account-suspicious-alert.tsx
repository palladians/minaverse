import { AlertTriangleIcon } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface AccountSuspiciousAlertProps {
  title: string
  description: string
}

export const AccountSuspiciousAlert = ({
  title,
  description
}: AccountSuspiciousAlertProps) => {
  return (
    <Alert variant="destructive">
      <AlertTriangleIcon className="w-5 h-5" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  )
}
