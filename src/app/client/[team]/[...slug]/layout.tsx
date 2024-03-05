'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAppDispatch } from '@/redux/store'

import { SecondaryView } from '@/constants/ui'
import { setSecondaryView } from '@/redux/ui'

export default function ChannelLayout({ children }: { children: React.ReactNode }) {
  const params = useParams()
  const router = useRouter()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const teamId = params.team as string
    const [channelId, secondaryType, secondaryId] = params.slug as [string, SecondaryView, string]

    if (!secondaryType) {
      dispatch(setSecondaryView(SecondaryView.None))
      return
    }

    const isValidType = Object.values(SecondaryView).includes(secondaryType)
    if (isValidType) {
      dispatch(setSecondaryView(secondaryType))
      return
    }

    router.replace(`/client/${teamId}/${channelId}`)
  }, [router, params, dispatch])

  return (
    <>
      <div aria-hidden="true" className="absolute" tabIndex={1} />
      <div className="app-container">{children}</div>
    </>
  )
}
