import { NextComponentType } from 'next'
import classnames from 'classnames'
import Markdown from 'react-markdown'

import { Chat } from '@/types/chat'

type Props = {
  className?: string
  chat: Chat
}

const ChatContent: NextComponentType<{}, {}, Props> = ({ className, chat }) => {
  return <Markdown className={classnames(className, 'w-full text-black/90')}>{chat.text}</Markdown>
}

export default ChatContent
