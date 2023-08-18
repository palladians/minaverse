'use client'
import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'

import { TooltipProvider } from '@/components/ui/tooltip'

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>{children}</TooltipProvider>
    </ThemeProvider>
  )
}

export default Providers
