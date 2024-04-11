import { NextComponentType } from 'next'
import classnames from 'classnames'
import { noop } from 'remeda'

import { Chat, ChatType } from '@/types/chat'
import { useAppSelector } from '@/redux/store'
import { lookupUser } from '@/redux/user'
import { lookupBot } from '@/redux/chat'

import ChatMeta from '@/components/chat/item/ChatMeta'
import BotAvatar from '@/components/avatar/BotAvatar'
import UserAvatar from '@/components/avatar/UserAvatar'
import ChatContent from '@/components/chat/item/ChatContent'
import { SecondaryView } from '@/constants/ui'
import { selectTeamId } from '@/redux/team'
import { selectChannelId } from '@/redux/channel'
import { useRouter } from 'next/navigation'

type Props = {
  className?: string
  chat: Chat
  onClick?: () => void
}

const ChatItem: NextComponentType<{}, {}, Props> = ({ className, chat, onClick = noop }) => {
  const router = useRouter()
  const teamId = useAppSelector(selectTeamId)
  const channelId = useAppSelector(selectChannelId)

  const bot = useAppSelector(lookupBot(chat.bot))
  const user = useAppSelector(lookupUser(chat.user))

  const isUser = chat.type === ChatType.HUMAN
  const isBot = chat.type === ChatType.AI

  const handleClickAvatar = () => {
    const suffix = isUser ? `${SecondaryView.Profile}/${user.id}` : `${SecondaryView.Bot}/${bot.id}`
    const profileUrl = `/client/${teamId}/${channelId}/${suffix}`
    router.push(profileUrl)
  }

  return (
    <div
      className={classnames(
        className,
        'flex min-h-[52px] w-full items-start px-5 py-2 hover:bg-black/2',
      )}
      onClick={() => onClick()}
    >
      <div className="mr-2 cursor-pointer" onClick={() => handleClickAvatar()}>
        {isBot && <BotAvatar bot={bot} size={36} />}
        {isUser && <UserAvatar user={user} size={36} />}
      </div>
      <div className="-my-4 w-full py-2 pr-2">
        <ChatMeta chat={chat} name={isBot ? bot.name : user.name} />
        <ChatContent chat={chat} />
      </div>
    </div>
  )
}

export default ChatItem
