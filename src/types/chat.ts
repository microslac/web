export enum ChatType {
  HUMAN = 'human',
  AI = 'ai',
}

export type ChatPayload = {
  bot: string
  text: string
  type: ChatType
}

export type Chat = {
  bot: string
  user: string
  chat: string
  text: string
  type: ChatType
  ts: number

  client_msg_id: string
}

export type History = {
  chats: Chat[]
  messages?: Chat[]
  has_more: boolean
  next_ts?: number
  response_metadata: {
    next_cursor: string
  }
}

export type Stream = {
  bot: string
  text: string
  replace?: boolean
}

export type Bot = {
  id: string
  name: string
  type: string
  model: string
  status: string
  created: number
  updated?: number
  avatar_hash: string
  instruction: string
}
