import { createContext, useContext } from 'react'
import { NextComponentType } from 'next'
import { SocketContext } from '@/contexts/socket'
import { SocketType } from '@/constants/socket'
import {
  SocketPresenceChange,
  SocketPresenceSub,
  SocketHandshake,
  SocketPing,
  SocketUserProfileChanged,
  SocketChannelMemberJoined,
} from '@/types/socket'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { selectChannels } from '@/redux/channel'
import { updatePresence, updateUser } from '@/redux/user'
import { useSocket } from '@/hooks/socket/use-socket'
import { getUser } from '@/redux/user/actions'
import { noop } from 'remeda'

type UserContextType = {
  sendSubscription: (userIds: string[]) => void
}

export const UserContext = createContext<UserContextType>({
  sendSubscription: (userIds: string[]) => {},
})

type Props = {
  children: React.ReactNode
}

export const UserProvider: NextComponentType<{}, {}, Props> = ({ children }) => {
  const { sendJson } = useContext(SocketContext)
  const channels = useAppSelector(selectChannels)
  const dispatch = useAppDispatch()

  const sendSubscription = (userIds: string[]) => {
    const payload: SocketPresenceSub = {
      type: SocketType.PresenceSub,
      users: userIds,
    }
    sendJson(payload)
  }

  useSocket<SocketHandshake>(SocketType.Hello, (handshake) => {
    if (handshake.start) {
      const imChannels = channels.filter((channel) => channel.is_im)
      sendSubscription(imChannels.map((channel) => channel.user))
    }
  })

  useSocket<SocketPresenceChange>(SocketType.PresenceChanged, (payload) => {
    const { users, presence } = payload
    dispatch(updatePresence({ ids: users, presence }))
  })

  useSocket<SocketHandshake>(SocketType.Hello, (handshake) => {
    if (handshake.start) {
      const payload: SocketPing = { type: SocketType.Ping }
      setInterval(() => {
        sendJson(payload)
      }, 10000)
    }
  })

  useSocket<SocketUserProfileChanged>(SocketType.UserProfileChanged, (payload) => {
    dispatch(updateUser({ user: payload.user }))
  })

  useSocket<SocketChannelMemberJoined>(SocketType.ChannelMemberJoined, (payload) => {
    dispatch(getUser({ team: payload.team, user: payload.user, force: false }))
    sendSubscription([payload.user])
  })

  return <UserContext.Provider value={{ sendSubscription }}>{children}</UserContext.Provider>
}
