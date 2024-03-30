'use client'

import React from 'react'
import store from '@/redux/store'
import { Provider } from 'react-redux'

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}
