import { NextComponentType } from 'next'
import classnames from 'classnames'

import { Message } from '@/types/message'
import MessageMeta from './MessageMeta'
import MessageAvatar from './MessageAvatar'
import MessageContent from './MessageContent'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/redux/store'
import { selectTeamId } from '@/redux/team'
import { selectChannelId } from '@/redux/channel'
import { SecondaryView } from '@/constants/ui'

type Props = {
  className?: string
  message: Message
}

const MessageItem: NextComponentType<{}, {}, Props> = ({ className, message }) => {
  const router = useRouter()
  const teamId = useAppSelector(selectTeamId)
  const channelId = useAppSelector(selectChannelId)

  const handleClickAvatar = () => {
    const profileUrl = `/client/${teamId}/${channelId}/${SecondaryView.Profile}/${message.user}`
    router.push(profileUrl)
  }

  return (
    <div
      className={classnames(
        className,
        'flex min-h-[52px] w-full items-start px-5 py-2 hover:bg-black/3',
      )}
    >
      <MessageAvatar className="mr-2" message={message} onClick={handleClickAvatar} />
      <div className="-my-4 w-full py-2 pr-2">
        <MessageMeta message={message} />
        <MessageContent message={message} />
      </div>
    </div>
  )
}

export default MessageItem
