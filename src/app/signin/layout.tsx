import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Signin - Slac',
}

export default function SigninLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col overflow-x-hidden">
      <div className="flex items-center pb-10 pt-12">
        <div className="w-full flex-1 pl-10"></div>
        <div className="flex-1 text-center text-3xl font-black">Slac</div>
        <div className="flex flex-1 flex-col pr-10 text-right">
          <div className="text-black/40">New to Slac?</div>
          <Link href="/signup" className="hover:underline">
            Create an account
          </Link>
        </div>
      </div>
      {children}
      <div className="flex-center py-8 text-black/60">
        <div className="mx-4">Privacy & Terms</div>
        <div className="mx-4">Contact Us</div>
        <div className="mx-4">Change Region</div>
      </div>
    </div>
  )
}
