import { AppState } from '@/redux/store'
import { createSelector } from '@reduxjs/toolkit'
import { Channel } from '@/types/channel'
import { sortBy } from 'remeda'

const selectCache = (state: AppState) => state.channel.cache

export const selectChannelId = (state: AppState) => state.channel.id

export const selectChannel = createSelector(
  selectCache,
  selectChannelId,
  (cache, channelId) => cache[channelId] || ({} as Channel),
)

export const lookupChannel = (channelId: string) => (state: AppState) =>
  state.channel.cache[channelId || state.channel.id]

export const selectChannels = createSelector(selectCache, (cache) => Object.values(cache))

export const selectChannelMapping = (state: AppState) => state.channel.cache
