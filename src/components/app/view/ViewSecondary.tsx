import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { NextComponentType } from 'next'
import classnames from 'classnames'

import { useAppSelector } from '@/redux/store'
import { lookupUser } from '@/redux/user'
import { selectView } from '@/redux/ui'
import { lookupBot } from '@/redux/chat'
import { useAppParams } from '@/hooks/app/use-app-params'
import { SecondaryView } from '@/constants/ui'

import ViewSecondaryProfile from '@/components/app/view/secondary/ViewSecondaryProfile'
import ViewSecondaryChat from '@/components/app/view/secondary/ViewSecondaryChat'
import ViewSecondaryBot from '@/components/app/view/secondary/ViewSecondaryBot'

type Props = {
  className?: string
}

const ViewSecondary: NextComponentType<{}, {}, Props> = ({ className }) => {
  const router = useRouter()
  const params = useAppParams()
  const view = useAppSelector(selectView)
  const user = useAppSelector(lookupUser(params.secondary))
  const bot = useAppSelector(lookupBot(params.secondary))

  const isProfile = params.group === SecondaryView.Profile
  const isChat = params.group === SecondaryView.Chat
  const isBot = params.group === SecondaryView.Bot

  const close = useCallback(() => {
    router.push(`/client/${params.team}/${params.channel}`)
  }, [router, params])

  useEffect(() => {
    if (isProfile && params.secondary && !user.id) close()
    if (isChat && params.secondary && !bot.id) close()
    if (isBot && params.secondary && !bot.id) close()
  }, [user, bot, isBot, isChat, isProfile, params, close])

  if (!view.secondary) return null

  return (
    <div
      className={classnames(className, 'border-l border-black/20', {
        'min-w-[340px]': isProfile,
        'min-w-[480px]': isChat,
        'max-w-[340px]': isBot,
      })}
    >
      {isProfile && <ViewSecondaryProfile close={close} user={user} />}
      {isChat && <ViewSecondaryChat close={close} bot={bot} />}
      {isBot && <ViewSecondaryBot close={close} bot={bot} />}
    </div>
  )
}

export default ViewSecondary
