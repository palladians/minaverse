import { CopyIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useClipboard } from '@/lib/clipboard'

interface CopyValueProps {
  value: string
}

export const CopyValue = ({ value }: CopyValueProps) => {
  const { copyValue } = useClipboard()
  return (
    <div className="flex gap-1 items-center">
      <p>{value}</p>
      <Button variant="link" size="icon" onClick={() => copyValue({ value })}>
        <CopyIcon size={16} />
      </Button>
    </div>
  )
}
