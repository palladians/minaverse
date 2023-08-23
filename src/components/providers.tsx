'use client'
import { ThemeProvider } from 'next-themes'
import { Next13ProgressBar } from 'next13-progressbar'
import React, { ReactNode } from 'react'

import { TooltipProvider } from '@/components/ui/tooltip'

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Next13ProgressBar color="#C873F0" options={{ showSpinner: false }} />
        {children}
      </TooltipProvider>
    </ThemeProvider>
  )
}

export default Providers
