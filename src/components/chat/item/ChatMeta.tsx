import { NextComponentType } from 'next'
import classnames from 'classnames'
import dayjs from 'dayjs'

import { Chat } from '@/types/chat'

type Props = {
  className?: string
  chat: Chat
  name: string
}

const MessageMeta: NextComponentType<{}, {}, Props> = ({ className, chat, name }) => {
  const time = dayjs.unix(chat.ts).format('HH:mm A')

  return (
    <div className={classnames(className)}>
      <span className="cursor-pointer font-bold text-black/90 hover:underline">{name}</span>
      &nbsp;&nbsp;
      {chat.ts && (
        <span className="cursor-pointer text-xs text-black/60 hover:underline">{time}</span>
      )}
    </div>
  )
}

export default MessageMeta
