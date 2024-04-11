'use client'

import React, { useEffect, useCallback } from 'react'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/dist/client/components/navigation'
import { useAppDispatch } from '@/redux/store'
import { clientBoot } from '@/redux/client/actions'
import { authObtain } from '@/redux/auth/actions'
import { conversationView } from '@/redux/conversation/actions'
import { SocketProvider } from '@/contexts/socket'
import { UserProvider } from '@/contexts/user'
import { useAppParams } from '@/hooks/app/use-app-params'
import { listBots } from '@/redux/chat/actions'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const params = useAppParams()
  const dispatch = useAppDispatch()

  const [fetched, setFetched] = React.useState(false)

  const dispatchAuthObtain = useCallback(
    async (teamId: string) => {
      return await dispatch(authObtain({ team: teamId }))
        .unwrap()
        .then((data) => {
          if (data.ok) {
            const oneMonth = 30 * 24 * 60 * 60 * 1000
            const expires = new Date(Date.now() + oneMonth)
            setCookie(process.env.COOKIE_ACCESS_TOKEN as string, data.access, { expires })
            setCookie(process.env.COOKIE_REFRESH_TOKEN as string, data.refresh, { expires })
          }
        })
    },
    [dispatch],
  )

  const dispatchConversationView = useCallback(
    async (teamId: string, channelId: string) => {
      return dispatch(conversationView({ team: teamId, channel: channelId }))
        .unwrap()
        .then((data) => {
          const href = `/client/${teamId}/${data.channel.id}`
          if (!pathname.includes(href)) router.push(href)
        })
    },
    [dispatch, pathname, router],
  )

  useEffect(() => {
    const teamId = params.team as string
    const channelId = params.channel as string

    if (fetched) return

    // TODO: check access, refresh expire at weekend, send auth/
    Promise.resolve()
      .then(() => dispatchAuthObtain(teamId))
      .then(() => dispatch(clientBoot(teamId)))
      .then(() => dispatchConversationView(teamId, channelId))
      .then(() => dispatch(listBots(teamId)))
      .then(() => setFetched(true))
      .catch((error) => router.replace('/signin/teams'))
  }, [fetched, params, router, dispatch, dispatchAuthObtain, dispatchConversationView])

  if (!fetched) return <></>

  return (
    <SocketProvider>
      <UserProvider>{children}</UserProvider>
    </SocketProvider>
  )
}
