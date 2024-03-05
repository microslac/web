import { createSlice, createAction, PayloadAction, isAnyOf } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { AppState } from '@/redux/store'
import { findIndex } from 'remeda'

import { Message } from '@/types/message'
import { History } from '@/types/conversation'
import {
  conversationView,
  postMessage,
  fetchMessages,
  loadMoreMessages,
} from '@/redux/conversation/actions'

export interface ConversationState {
  cache: { [key: string]: History }
}

const initialState: ConversationState = {
  cache: {},
}

const hydrate = createAction<AppState>(HYDRATE)

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      const message = action.payload
      if (!state.cache[message.channel]) {
        state.cache[message.channel] = {
          messages: [],
          has_more: false,
          response_metadata: { next_cursor: '' },
        }
      }
      const messages = state.cache[message.channel].messages
      if (message.ts > messages[0]?.ts) messages.unshift(message)
    },
    appendMessages(state, action: PayloadAction<Message[]>) {
      const messages = action.payload
      if (!messages.length) return
      const channel = messages[0].channel
      const conversation = state.cache[channel]
      conversation.messages.push(...messages)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        return {
          ...state,
          ...action.payload.conversation,
        }
      })
      .addCase(conversationView.fulfilled, (state, action) => {
        const { channel, history, response_metadata } = action.payload
        state.cache[channel.id] = { ...history, response_metadata }
      })
      .addCase(postMessage.fulfilled, (state, action) => {
        const { channel, message } = action.payload
        const messages = state.cache[channel].messages || []
        const idx = findIndex(messages, (m) => m.client_msg_id === message.client_msg_id)

        if (!message.client_msg_id) return
        if (messages.length === 0) {
          messages.push(message)
        } else if (idx > -1) {
          messages[idx] = Object.assign({}, messages[idx], message)
        }
      })
      .addMatcher(isAnyOf(fetchMessages.fulfilled, loadMoreMessages.fulfilled), (state, action) => {
        if (!action.payload) return
        const { messages, ...rest } = action.payload
        state.cache[rest.channel] = state.cache[rest.channel] || { messages: [] }
        state.cache[rest.channel].messages.push(...messages)
        state.cache[rest.channel] = {
          ...state.cache[rest.channel],
          ...rest,
        }
      })
  },
})

export * from './selectors'

export const { addMessage, appendMessages } = conversationSlice.actions
