import { setupApi, thunkRequest } from '@/services/api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppState } from '@/redux/store'

import { Channel } from '@/types/channel'
import { Message } from '@/types/message'
import { History } from '@/types/conversation'
import { Conversation } from '@/constants/conversation'
import { addMessage } from '@/redux/conversation/index'
import { getUser } from '@/redux/user/actions'

export type ConversationViewPayload = {
  team: string
  channel: string
  limit?: number
}

export type ConversationViewResponse = {
  ok: boolean
  emojis: { [key: string]: object }
  channel: Channel
  channels: Channel[]
  history: History
  user_ids: string[]
  response_metadata: {
    next_cursor: string
  }
}

export type ConversationPostResponse = {
  ok: boolean
  channel: string
  message: Message
  ts: string
}

export const conversationView = createAsyncThunk(
  'conversation/view',
  async (payload: ConversationViewPayload, thunkAPI) => {
    return thunkRequest(thunkAPI, async () => {
      const api = setupApi()
      payload = { ...payload, limit: payload.limit || Conversation.Limit }
      const resp = await api.post('conversations/view', { json: payload })
      return await resp.json<ConversationViewResponse>()
    })
  },
)

export const postMessage = createAsyncThunk(
  'conversation/post',
  async (message: Message, thunkAPI) => {
    thunkAPI.dispatch(addMessage(message))

    return thunkRequest(thunkAPI, async () => {
      const api = setupApi()
      const resp = await api.post('conversations/post', { json: message })
      return await resp.json<ConversationPostResponse>()
    })
  },
)

export const loadMoreMessages = createAsyncThunk('conversation/load_more', async (_, thunkAPI) => {
  const state = thunkAPI.getState() as AppState
  const history = state.conversation.cache[state.channel.id]
  if (history && !history.has_more) return
  const api = setupApi()
  const params = {
    team: state.team.id,
    channel: state.channel.id,
    limit: Conversation.Limit,
    cursor: history.response_metadata?.next_cursor,
    ignore_replies: true,
  }

  return thunkRequest(thunkAPI, async () => {
    const resp = await api.post('conversations/history', { json: params })
    const data = await resp.json<History>()
    return { ...data, channel: state.channel.id }
  })
})

export const fetchMessages = createAsyncThunk('conversation/history', async (_, thunkAPI) => {
  const state = thunkAPI.getState() as AppState
  if (state.conversation.cache[state.channel.id]?.messages.length) return
  const api = setupApi()
  const params = {
    team: state.team.id,
    channel: state.channel.id,
    limit: Conversation.Limit,
    ignore_replies: true,
  }

  return thunkRequest(thunkAPI, async () => {
    const resp = await api.post('conversations/history', { json: params })
    const data = await resp.json<History>()
    return { ...data, channel: state.channel.id }
  })
})

type OpenConversationPayload = {
  team?: string
  user?: string
  users: string[]
  return_im?: boolean
}

type OpenConversationResponse = {
  ok: boolean
  channel: Channel
  already_open: boolean
}

export const openConversation = createAsyncThunk(
  'conversation/open',
  async (payload: OpenConversationPayload, thunkAPI) => {
    const api = setupApi()
    const state = thunkAPI.getState() as AppState

    payload = {
      team: payload.team || state.team.id,
      user: payload.user || state.user.id,
      users: payload.users || [],
      return_im: true,
    }

    return thunkRequest(thunkAPI, async () => {
      const resp = await api.post('conversations/open', { json: payload })
      const data = await resp.json<OpenConversationResponse>() // TODO: add, select channel
      return { ...data }
    })
  },
)

export type GetConversationPayload = {
  team: string
  channel: string
  force?: boolean
}

export type GetConversationResponse = {
  ok: boolean
  channel: Channel
}

export const getConversation = createAsyncThunk(
  'conversation/info',
  async (payload: GetConversationPayload, thunkAPI) => {
    const state = thunkAPI.getState() as AppState
    const channel = state.channel.cache[payload.channel]
    if (channel && !payload.force) return

    return thunkRequest(thunkAPI, async () => {
      const api = setupApi()
      const resp = await api.post('conversations/info', { json: payload })
      const data = await resp.json<GetConversationResponse>()
      if (data.channel.is_im && data.channel.user) {
        const payload = { team: data.channel.team, user: data.channel.user, force: true }
        await thunkAPI.dispatch(getUser(payload))
      }
      return data
    })
  },
)
