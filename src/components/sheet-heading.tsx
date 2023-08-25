import React from 'react'

import { SheetTitle } from '@/components/ui/sheet'

interface SheetHeaderProps {
  title: string
  addons: React.ReactNode
}

export const SheetHeading = ({ title, addons }: SheetHeaderProps) => {
  return (
    <div className="flex gap-4 items-center">
      <SheetTitle>{title}</SheetTitle>
      {addons}
    </div>
  )
}
