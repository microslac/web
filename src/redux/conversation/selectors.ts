import { AppState } from '@/redux/store'
import { createSelector } from '@reduxjs/toolkit'
import { selectChannelId } from '@/redux/channel/selectors'

const selectCache = (state: AppState) => state.conversation.cache

export const selectHistory = createSelector(
  selectCache,
  selectChannelId,
  (cache, channelId) => cache[channelId],
)

export const selectMessages = createSelector(
  selectCache,
  selectChannelId,
  (cache, channelId) => cache[channelId]?.messages || [],
)

export const selectHasMore = createSelector(
  selectCache,
  selectChannelId,
  (cache, channelId) => cache[channelId]?.has_more || false,
)
