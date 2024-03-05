import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { AppState } from '@/redux/store'

import { Auth } from '@/types/auth'
import { authLogin } from '@/redux/auth/actions'

export interface AuthState {
  auth: Auth
}

const initialState: AuthState = {
  auth: null as any,
}

const hydrate = createAction<AppState>(HYDRATE)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ auth: Auth }>) => {
      state.auth = action.payload.auth
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      }
    })
  },
})

export * from './selectors'
