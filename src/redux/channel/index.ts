import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { AppState } from '@/redux/store'
import { sortBy } from 'remeda'

import { Channel } from '@/types/channel'
import { clientBoot } from '@/redux/client/actions'
import { conversationView, openConversation, getConversation } from '@/redux/conversation/actions'

export interface ChannelState {
  cache: { [key: string]: Channel }
  id: string
}

const initialState: ChannelState = {
  cache: {},
  id: '',
}

const hydrate = createAction<AppState>(HYDRATE)

export const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    setChannelId: (state, action: PayloadAction<string>) => {
      state.id = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        return {
          ...state,
          ...action.payload.channel,
        }
      })
      .addCase(clientBoot.fulfilled, (state, action) => {
        const { channels, ims } = action.payload
        const allChannels = sortBy([...channels, ...ims], (channel) => channel.name)
        for (const channel of allChannels) {
          state.cache[channel.id] = Object.assign({}, state.cache[channel.id], channel)
        }
      })
      .addCase(conversationView.fulfilled, (state, action) => {
        const { channel } = action.payload
        state.cache[channel.id] = Object.assign({}, state.cache[channel.id], channel)
        state.id = channel.id
      })
      .addCase(openConversation.fulfilled, (state, action) => {
        const { channel } = action.payload
        state.cache[channel.id] = Object.assign({}, state.cache[channel.id], channel)
      })
      .addCase(getConversation.fulfilled, (state, action) => {
        if (!action.payload) return
        const { channel } = action.payload
        state.cache[channel.id] = Object.assign({}, state.cache[channel.id], channel)
      })
  },
})

export * from './selectors'

export const { setChannelId } = channelSlice.actions
