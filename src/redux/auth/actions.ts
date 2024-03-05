import { createAsyncThunk } from '@reduxjs/toolkit'
import { getCookie } from 'cookies-next'

import api, { thunkRequest, setupApi } from '@/services/api'
import { Auth } from '@/types/auth'

export type LoginPayload = {
  email: string
  password: string
}

export type LoginResponse = {
  ok: boolean
  auth: Auth
  access: string
}

export const authLogin = createAsyncThunk('auth/login', async (payload: LoginPayload, thunkAPI) => {
  return thunkRequest(thunkAPI, async () => {
    const resp = await api.post('auth/login', { json: payload })
    return await resp.json<LoginResponse>()
  })
})

export const authSignup = createAsyncThunk(
  'auth/login',
  async (payload: LoginPayload, thunkAPI) => {
    return thunkRequest(thunkAPI, async () => {
      const resp = await api.post('auth/signup', { json: payload })
      return await resp.json<LoginResponse>()
    })
  },
)

export type ObtainPayload = {
  team: string
}

export type ObtainResponse = {
  ok: boolean
  access: string
  refresh: string
}

export const authObtain = createAsyncThunk(
  'auth/obtain',
  async (payload: ObtainPayload, thunkAPI) => {
    return thunkRequest(thunkAPI, async () => {
      const token = getCookie(process.env.COOKIE_AUTH_TOKEN as string)
      const api = setupApi(token)
      const resp = await api.post('auth/obtain', { json: payload })
      return await resp.json<ObtainResponse>()
    })
  },
)
