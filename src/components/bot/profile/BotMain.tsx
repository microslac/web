import { NextComponentType } from 'next'
import { useRouter } from 'next/navigation'
import classnames from 'classnames'
import Image from 'next/image'

import { Bot } from '@/types/chat'
import { selectTeamId } from '@/redux/team'
import { useAppSelector } from '@/redux/store'
import { selectChannelId } from '@/redux/channel'
import { SecondaryView } from '@/constants/ui'
import { AvatarSize, useAvatar } from '@/hooks/media/use-avatar'

type Props = {
  bot: Bot
}

const BotMain: NextComponentType<{}, {}, Props> = ({ bot }) => {
  const router = useRouter()
  const teamId = useAppSelector(selectTeamId)
  const channelId = useAppSelector(selectChannelId)

  const { getBotAvatar } = useAvatar()
  const avatarSize: number = AvatarSize.XXL
  const avatarSrc = getBotAvatar(bot, avatarSize)

  const handleChat = () => {
    const chatUrl = `/client/${teamId}/${channelId}/${SecondaryView.Chat}/${bot.id}`
    router.push(chatUrl)
  }

  return (
    <div>
      <div className={classnames('flex-center px-6 pt-6')}>
        <Image
          alt={bot.name}
          src={avatarSrc}
          width={avatarSize}
          height={avatarSize}
          className="h-[256px] w-[256px] rounded-md"
        />
      </div>
      <div className="p-4">
        <div>
          <div className="flex w-full items-center justify-between">
            <div className="text-1.5xl/[30px] font-bold">{bot.name}</div>
            <span className="cursor-pointer font-medium text-link hover:underline">Edit</span>
          </div>
        </div>
        <div className="mt-2 flex items-center">
          <div className="mr-auto flex items-center text-black/80">
            <div className={classnames('mr-2 mt-0.5 h-2.5 w-2.5 rounded-full bg-green-500')} />
            <span>Active</span>
          </div>
          <button
            type="button"
            className="flex min-h-[36px] min-w-[144px] items-center justify-center rounded border border-black/30 px-3 transition hover:bg-black/7"
            onClick={() => handleChat()}
          >
            <span>Chat</span>
          </button>
          <button
            type="button"
            className="ml-2 flex min-h-[36px] shrink-0 items-center justify-center rounded border border-black/30 px-3 transition hover:bg-black/7"
          >
            <span>#</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default BotMain
