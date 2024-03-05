import dayjs from 'dayjs'
import { useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { useAppSelector } from '@/redux/store'
import { selectTeamId } from '@/redux/team'
import { selectUserId } from '@/redux/user'
import { selectChannelId } from '@/redux/channel'
import { Message } from '@/types/message'
import { MessageType } from '@/constants/message'

type MessagePayload = {
  text: string
}

export const useMessageData = () => {
  const teamId = useAppSelector(selectTeamId)
  const userId = useAppSelector(selectUserId)
  const channelId = useAppSelector(selectChannelId)

  const prepareMessage = useCallback(
    (payload: MessagePayload): Message => {
      const { text } = payload

      return {
        team: teamId,
        user: userId,
        channel: channelId,
        type: MessageType.Message,
        text: text.trim(),
        ts: dayjs().unix(),
        client_msg_id: uuidv4(),
      }
    },
    [teamId, userId, channelId],
  )

  return {
    prepareMessage,
  }
}
