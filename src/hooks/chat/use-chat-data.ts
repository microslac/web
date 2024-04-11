import dayjs from 'dayjs'
import { useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { useAppSelector } from '@/redux/store'
import { Chat, ChatPayload } from '@/types/chat'
import { selectUserId } from '@/redux/user'

export const useChatData = () => {
  const chatId = 'C0123456789'
  const userId = useAppSelector(selectUserId)

  const prepareMsg = useCallback(
    (payload: ChatPayload): Chat => {
      const { bot, text, type } = payload

      return {
        bot,
        type: type,
        user: userId,
        chat: chatId,
        text: text.trim(),
        ts: dayjs().unix(),
        client_msg_id: uuidv4(),
      }
    },
    [userId],
  )

  return {
    prepareMsg,
  }
}
