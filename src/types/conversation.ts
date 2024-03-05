import { Message } from '@/types/message'

export type History = {
  messages: Message[]
  has_more: boolean
  next_ts?: number
  response_metadata: {
    next_cursor: string
  }
}
