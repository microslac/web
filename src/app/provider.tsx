'use client'

import { StoreProvider } from '@/redux/provider'
import { NextUIProvider } from '@nextui-org/react'

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </StoreProvider>
  )
}
