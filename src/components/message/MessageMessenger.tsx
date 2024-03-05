import { NextComponentType } from 'next'
import { useContext } from 'react'
import classnames from 'classnames'
import throttle from 'lodash/throttle'

import { useAppDispatch, useAppSelector } from '@/redux/store'
import { addMessage, selectMessages } from '@/redux/conversation'
import { postMessage, loadMoreMessages, getConversation } from '@/redux/conversation/actions'
import { useMessageData } from '@/hooks/message/use-message-data'
import { useSocket } from '@/hooks/socket/use-socket'
import { SocketContext } from '@/contexts/socket'
import { SocketType } from '@/constants/socket'
import { Message } from '@/types/message'

import MessageList from '@/components/message/list/MessageList'
import MessageComposer from '@/components/message/composer/MessageComposer'
import { selectChannelId } from '@/redux/channel'
import { selectUserId } from '@/redux/user'

type Props = {
  className?: string
}

const MessageMessenger: NextComponentType<{}, {}, Props> = ({ className }) => {
  const dispatch = useAppDispatch()
  const messages = useAppSelector(selectMessages)
  const userId = useAppSelector(selectUserId)
  const channelId = useAppSelector(selectChannelId)
  const { sendJson } = useContext(SocketContext)
  const { prepareMessage } = useMessageData()

  const handleSend = (content: string) => {
    if (!content.trim()) return
    const message = prepareMessage({ text: content })
    dispatch(postMessage(message))
  }

  useSocket<Message>(SocketType.Message, (message) => {
    if (message.user !== userId) dispatch(addMessage(message))
    dispatch(getConversation({ team: message.team, channel: message.channel }))
  })

  const loadMessages = () => {
    dispatch(loadMoreMessages())
  }

  const handleChange = (text: string) => {
    sendUserTyping()
  }

  const sendUserTyping = throttle(
    () => {
      sendJson({ type: SocketType.UserTyping, channel: channelId })
    },
    4000,
    { trailing: false },
  )

  return (
    <div className={classnames(className, 'flex h-full flex-col')}>
      <MessageList messages={messages} onLoadMore={loadMessages} className="flex-1" />
      <MessageComposer className="mx-5 mb-1 shrink-0" onSend={handleSend} onChange={handleChange} />
    </div>
  )
}

export default MessageMessenger
