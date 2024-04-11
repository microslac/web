import { setupApi, thunkRequest } from '@/services/api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppState } from '@/redux/store'

import { Bot, History } from '@/types/chat'
import { Chat } from '@/constants/chat'
import { Conversation } from '@/constants/conversation'

export type ListBotPayload = {
  team: string
}

export type ListBotResponse = {
  bots: Bot[]
}

export const listBots = createAsyncThunk('bots/list', async (teamId: string, thunkAPI) => {
  return thunkRequest(thunkAPI, async () => {
    const api = setupApi('', process.env.CHAT_URL)
    const payload: ListBotPayload = { team: teamId }
    const resp = await api.post('bots/list', { json: payload })
    return await resp.json<ListBotResponse>()
  })
})

export const fetchChats = createAsyncThunk('chat/history', async (_, thunkAPI) => {
  const state = thunkAPI.getState() as AppState
  if (state.chat.cache[state.chat.id]?.chats.length) return

  const api = setupApi('', process.env.CHAT_URL)

  const params = {
    bot: state.chat.id,
    chat: 'C0123456789',
    limit: Chat.Limit,
  }

  return thunkRequest(thunkAPI, async () => {
    const resp = await api.post('chat/history', { json: params })
    const data = await resp.json<History>()
    return { ...data, chat: state.chat.id }
  })
})

export const loadMoreChats = createAsyncThunk('chat/load', async (_, thunkAPI) => {
  return thunkRequest(thunkAPI, async () => {
    const state = thunkAPI.getState() as AppState
    const history = state.chat.cache[state.chat.id]
    if (history && !history.has_more) return

    const api = setupApi('', process.env.CHAT_URL)

    const params = {
      bot: state.chat.id,
      chat: 'C0123456789',
      limit: Conversation.Limit,
      cursor: history.response_metadata?.next_cursor,
    }

    return thunkRequest(thunkAPI, async () => {
      const resp = await api.post('chat/history', { json: params })
      const data = await resp.json<History>()

      return { ...data, chat: state.chat.id }
    })
  })
})

export type ClearChatPayload = {
  bot: string
  chat?: string
}

export type ClearChatResponse = {
  ok: boolean
}

export const clearChat = createAsyncThunk(
  'chat/clear',
  async (payload: ClearChatPayload, thunkAPI) => {
    return thunkRequest(thunkAPI, async () => {
      const state = thunkAPI.getState() as AppState
      const chats = state.chat.cache[payload.bot]?.chats || []
      if (!chats.length) return

      const api = setupApi('', process.env.CHAT_URL)
      const data = { bot: payload.bot, chat: payload.chat || chats[0].chat }
      const resp = await api.post('chat/clear', { json: data })
      return await resp.json<ClearChatResponse>()
    })
  },
)
