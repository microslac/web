import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Signup - Slac',
}

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col overflow-x-hidden">
      <div className="flex items-center pb-10 pt-12">
        <div className="w-full flex-1 pl-10" />
        <div className="flex-1 text-center text-3xl font-black">Slac</div>
        <div className="flex flex-1 flex-col pr-10 text-right" />
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
