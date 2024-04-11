import { AppState } from '@/redux/store'
import { createSelector } from '@reduxjs/toolkit'
import { History, Bot } from '@/types/chat'

const selectCache = (state: AppState) => state.chat.cache

const selectChatId = (state: AppState) => state.chat.id

export const selectBots = (state: AppState) => state.chat.bots || {}

export const lookupBot = (botId?: string) => (state: AppState) =>
  state.chat.bots[botId || state.chat.id]

export const selectHistory = (botId: string) => (state: AppState) =>
  state.chat.cache[botId] || ({} as History)

export const selectBot = createSelector(
  selectBots,
  selectChatId,
  (bots, chatId) => bots[chatId] || ({} as Bot),
)

export const selectChats = createSelector(
  selectCache,
  selectChatId,
  (cache, chatId) => cache[chatId]?.chats || [],
)
