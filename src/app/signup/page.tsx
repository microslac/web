'use client'

import { useRouter } from 'next/navigation'
import SigninForm from '@/components/signin/SigninForm'

export default function SignupPage() {
  const router = useRouter()
  const handleSignup = () => {
    router.push('/signin/teams')
  }

  return (
    <div className="flex h-full flex-col items-center justify-start">
      <div className="mb-4 text-5xl font-bold">Sign up to Slac</div>
      <div className="mb-8 text-black/70">
        We suggest using the <strong>email address you use at work.</strong>
      </div>
      <SigninForm onLogin={handleSignup} isSignup />
    </div>
  )
}
