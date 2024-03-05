import { NextComponentType } from 'next'
import React, { useState } from 'react'
import { noop, omit } from 'remeda'
import classnames from 'classnames'

import { SocketType } from '@/constants/socket'
import { SocketUserTyping } from '@/types/socket'
import { Message } from '@/types/message'
import { useAppSelector } from '@/redux/store'
import { selectUsers } from '@/redux/user'
import { selectChannelId } from '@/redux/channel'
import { useSocket } from '@/hooks/socket/use-socket'

type Props = {
  className?: string
  max?: number
}

const TypingIndicator: NextComponentType<{}, {}, Props> = ({ className, max = 3 }) => {
  const [channels, setChannels] = useState<{ [key: string]: { [key: string]: () => void } }>({})

  const channelId = useAppSelector(selectChannelId)
  const users = useAppSelector(selectUsers(Object.keys(channels[channelId] || {})))

  useSocket<SocketUserTyping>(SocketType.UserTyping, (typing) => {
    if (!channels[typing.channel]) channels[typing.channel] = {}
    const channel = channels[typing.channel]
    const clearFn = channel[typing.user] || noop
    clearFn()

    const timeout = setTimeout(() => {
      setChannels((prev) => {
        // TODO: the object being returned contain user_id from other callback
        return { ...prev, [typing.channel]: omit(channel, [typing.user]) }
      })
    }, 5000)

    channel[typing.user] = () => clearTimeout(timeout)
  })

  useSocket<Message>(SocketType.Message, (message) => {
    if (message.channel === channelId) {
      const channel = channels[message.channel] || {}
      const clearFn = channel[message.user] || noop
      clearFn()
      setChannels((prev) => {
        return { ...prev, [message.channel]: omit(channel, [message.user]) }
      })
    }
  })

  return (
    <div className={classnames(className, 'flex h-6 items-center text-us text-black/80')}>
      <div className="flex-1">
        {users.slice(0, max).map((user, idx) => (
          <React.Fragment key={user.id}>
            {idx > 0 && <span> and </span>}
            <strong key={user.id} className="font-semibold">
              {user.name}
            </strong>
          </React.Fragment>
        ))}
        {users.length === 1 && <span> is typing</span>}
        {users.length > 1 && users.length <= 5 && <span> are typing</span>}
        {users.slice(max).length > 0 && (
          <>
            <span> and </span>
            <strong>{users.slice(max).length} others</strong>
            <span> are typing</span>
          </>
        )}
      </div>
    </div>
  )
}

export default TypingIndicator
