'use client'

import { useRouter } from 'next/navigation'
import SigninForm from '@/components/signin/SigninForm'

export default function SigninPage() {
  const router = useRouter()
  const handleLogin = () => {
    router.push('/signin/teams')
  }

  return (
    <div className="flex h-full flex-col items-center justify-start">
      <div className="mb-4 text-5xl font-bold">Sign in to Slac</div>
      <div className="mb-8 text-black/70">
        We suggest using the <strong>email address you use at work.</strong>
      </div>
      <SigninForm onLogin={handleLogin} />
    </div>
  )
}
