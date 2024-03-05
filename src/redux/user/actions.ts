import { setupApi, thunkRequest } from '@/services/api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { User, UserProfile } from '@/types/user'
import { AppState } from '@/redux/store'

export interface SetUserProfilePayload extends Partial<UserProfile> {
  team: string
  user: string
}

export interface SetUserProfileResponse {
  id: string
  ok: boolean
  profile: Partial<UserProfile>
}

export const setUserProfile = createAsyncThunk(
  'user/set-profile',
  async (profile: SetUserProfilePayload, thunkAPI) => {
    return thunkRequest(thunkAPI, async () => {
      const api = setupApi()
      const resp = await api.post('users/set-profile', { json: profile })
      return await resp.json<SetUserProfileResponse>()
    })
  },
)

export type GetUserPayload = {
  team: string
  user: string
  force?: boolean
}

export type GetUserResponse = {
  ok: boolean
  user: User
}

export const getUser = createAsyncThunk('user/info', async (payload: GetUserPayload, thunkAPI) => {
  const state = thunkAPI.getState() as AppState
  const user = state.user.cache[payload.user]
  if (user && !payload.force) return

  return thunkRequest(thunkAPI, async () => {
    const api = setupApi()
    const resp = await api.post('users/info', { json: payload })
    return await resp.json<GetUserResponse>()
  })
})
