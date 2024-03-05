import { SocketSubtype, SocketType } from '@/constants/socket'
import { User, UserPresence } from '@/types/user'

export type SocketData = {
  id: number
  type: SocketType
  subtype?: SocketSubtype
  [key: string]: any
}

export type SocketHandshake = {
  type: SocketType.Hello
  start: boolean
  region: string
}

export type SocketPing = {
  type: SocketType.Ping
}

export type SocketPong = {
  type: SocketType.Pong
}

export type SocketUserTyping = {
  type: SocketType.UserTyping
  user: string
  channel: string
}

export type SocketPresenceSub = {
  type: SocketType.PresenceSub
  users: string[]
}

export type SocketPresenceChange = {
  type: SocketType.PresenceChanged
  presence: UserPresence
  users: string[]
}

export type SocketUserProfileChanged = {
  type: SocketType.UserProfileChanged
  user: User
}

export type SocketChannelMemberJoined = {
  type: SocketType.ChannelMemberJoined
  team: string
  user: string
  channel: string
  channel_type: string
  event_ts: number
  ts: number
}
