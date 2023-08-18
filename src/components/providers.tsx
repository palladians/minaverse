'use client'
import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  )
}

export default Providers
