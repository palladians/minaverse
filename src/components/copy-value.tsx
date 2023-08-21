import { CopyIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

interface CopyValueProps {
  value: string
}

export const CopyValue = ({ value }: CopyValueProps) => {
  const { toast } = useToast()
  const handleOnClick = async () => {
    await navigator.clipboard.writeText(value)
    toast({ title: 'The value was copied to clipboard.' })
  }
  return (
    <div className="flex gap-1 items-center">
      <p>{value}</p>
      <Button variant="link" size="icon" onClick={handleOnClick}>
        <CopyIcon size={16} />
      </Button>
    </div>
  )
}
