import { AppState } from '@/redux/store'
import { createSelector } from '@reduxjs/toolkit'
import { User } from '@/types/user'

const selectCache = (state: AppState) => state.user.cache

export const selectUserId = (state: AppState) => state.user.id

export const selectUser = createSelector(
  selectCache,
  selectUserId,
  (cache, userId) => cache[userId] || ({} as User),
)

export const lookupUser = (userId?: string) => (state: AppState) =>
  state.user.cache[userId || state.user.id]

export const selectUsers = (userIds?: string[]) =>
  createSelector(selectCache, (cache) =>
    userIds ? userIds.map((id) => cache[id]).filter(Boolean) : Object.values(cache),
  )

export const selectUserMapping = (state: AppState) => state.user.cache
