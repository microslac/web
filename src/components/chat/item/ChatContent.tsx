import { NextComponentType } from 'next'
import { Chat } from '@/types/chat'
import classnames from 'classnames'

type Props = {
  className?: string
  chat: Chat
}

const ChatContent: NextComponentType<{}, {}, Props> = ({ className, chat }) => {
  return <div className={classnames(className, 'w-full text-black/90')}>{chat.text}</div>
}

export default ChatContent
