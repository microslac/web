import { configureStore, Action, ThunkAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

import { uiSlice } from '@/redux/ui'
import { authSlice } from '@/redux/auth'
import { teamSlice } from '@/redux/team'
import { userSlice } from '@/redux/user'
import { channelSlice } from '@/redux/channel'
import { conversationSlice } from '@/redux/conversation'

const makeStore = () => {
  return configureStore({
    reducer: {
      [uiSlice.name]: uiSlice.reducer,
      [authSlice.name]: authSlice.reducer,
      [teamSlice.name]: teamSlice.reducer,
      [userSlice.name]: userSlice.reducer,
      [channelSlice.name]: channelSlice.reducer,
      [conversationSlice.name]: conversationSlice.reducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
  })
}

const store = makeStore()

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector = useSelector
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>

export default store
