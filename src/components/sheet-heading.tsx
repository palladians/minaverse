import { ExternalLinkIcon, LinkIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { SheetTitle } from '@/components/ui/sheet'

interface SheetHeaderProps {
  title: string
  onOpenExtended: () => void
  onCopy: () => void
}

export const SheetHeading = ({
  title,
  onOpenExtended,
  onCopy
}: SheetHeaderProps) => {
  return (
    <div className="flex gap-4 items-center">
      <SheetTitle>{title}</SheetTitle>
      <Button size="icon" variant="ghost" onClick={onOpenExtended}>
        <ExternalLinkIcon size={20} />
      </Button>
      <Button size="icon" variant="ghost" onClick={onCopy}>
        <LinkIcon size={20} />
      </Button>
    </div>
  )
}
