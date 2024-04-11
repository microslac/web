import { createSlice, createAction, PayloadAction, isAnyOf } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { AppState } from '@/redux/store'
import { Chat, History, Stream, Bot } from '@/types/chat'
import { clearChat, fetchChats, listBots } from '@/redux/chat/actions'

export interface ChatState {
  cache: { [key: string]: History }
  bots: { [key: string]: Bot }
  id: string
}

const initialState: ChatState = {
  cache: {},
  bots: {},
  id: '',
}

const hydrate = createAction<AppState>(HYDRATE)

const createDefaultHistory = (): History => {
  return {
    chats: [],
    has_more: false,
    response_metadata: { next_cursor: '' },
  }
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatId: (state, action: PayloadAction<string>) => {
      state.id = action.payload
    },
    streamChat: (state, action: PayloadAction<Stream>) => {
      const { bot, text, replace = false } = action.payload
      const chat = state.cache[bot].chats[0]

      if (replace) chat.text = text
      else chat.text = chat.text + text
    },
    addChat: (state, action: PayloadAction<Chat>) => {
      const chat = action.payload
      if (!state.cache[chat.bot]) state.cache[chat.bot] = createDefaultHistory()
      const chats = state.cache[chat.bot].chats
      chats.unshift(chat)
    },
    appendChats: (state, action: PayloadAction<Chat[]>) => {
      const chats = action.payload
      if (!chats.length) return
      const bot = chats[0].bot
      state.cache[bot].chats.push(...chats)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        return { ...state, ...action.payload.chat }
      })
      .addCase(listBots.fulfilled, (state, action) => {
        const { bots } = action.payload
        for (const bot of bots) {
          state.bots[bot.id] = Object.assign({}, state.cache[bot.id], bot)
        }
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        if (!action.payload) return

        const { messages: chats = [], ...rest } = action.payload
        state.cache[rest.chat] = state.cache[rest.chat] || { chats: [] }
        state.cache[rest.chat].chats.push(...chats)
        state.cache[rest.chat] = {
          ...state.cache[rest.chat],
          ...rest,
        }
      })
      .addCase(clearChat.fulfilled, (state, action) => {
        if (!action.payload) return

        state.cache[state.id] = createDefaultHistory()
      })
  },
})

export * from './selectors'

export const { setChatId, addChat, appendChats, streamChat } = chatSlice.actions
