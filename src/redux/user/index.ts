import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { AppState } from '@/redux/store'

import { User, UserPresence } from '@/types/user'
import { clientBoot } from '@/redux/client/actions'
import { getUser, setUserProfile } from '@/redux/user/actions'

export interface UserState {
  cache: { [key: string]: User }
  id: string
}

const initialState: UserState = {
  cache: {},
  id: '',
}

const hydrate = createAction<AppState>(HYDRATE)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<{ user: User }>) => {
      const { user } = action.payload
      state.cache[user.id] = Object.assign({}, state.cache[user.id], user)
    },
    updatePresence: (state, action: PayloadAction<{ ids: string[]; presence: UserPresence }>) => {
      const { ids, presence } = action.payload
      for (const id of ids) {
        state.cache[id] = Object.assign({}, state.cache[id], { presence })
      }
    },
    updateProfile: (
      state,
      action: PayloadAction<{ id: string; profile: Partial<User['profile']> }>,
    ) => {
      const { id, profile } = action.payload
      if (state.cache[id]) {
        state.cache[id].profile = Object.assign({}, state.cache[id].profile, profile)
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        return {
          ...state,
          ...action.payload.user,
        }
      })
      .addCase(clientBoot.fulfilled, (state, action) => {
        const { self, users } = action.payload
        for (const user of [...users, self]) {
          state.cache[user.id] = Object.assign({}, state.cache[user.id], user)
        }
        state.id = self.id
        state.cache[self.id].presence = 'active'
      })
      .addCase(setUserProfile.fulfilled, (state, action) => {
        const { id, profile } = action.payload
        state.cache[id].profile = Object.assign({}, state.cache[id].profile, profile)
      })
      .addCase(getUser.fulfilled, (state, action) => {
        if (!action.payload) return
        const { user } = action.payload
        state.cache[user.id] = Object.assign({}, state.cache[user.id], user)
      })
  },
})

export * from './selectors'

export const { updateUser, updatePresence, updateProfile } = userSlice.actions
