'use client'

import { useAppSelector } from '@/redux/store'
import { selectTeam } from '@/redux/team'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const team = useAppSelector(selectTeam)

  useEffect(() => {
    // if (!team.id) router.replace('/signin/teams')
  }, [router, team])

  return <>{children}</>
}
