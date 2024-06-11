import '@/styles/globals.scss'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import { AppProvider } from '@/app/provider'
import classnames from 'classnames'

const openSans = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Microslac',
  description: 'Microslac Application',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={classnames('light')}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
