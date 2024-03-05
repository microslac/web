import ky from 'ky'
import { getCookie } from 'cookies-next'

const api = ky.create({
  prefixUrl: process.env.API_URL,
  timeout: 30_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const baseApi = ky.create({
  prefixUrl: process.env.API_URL,
  timeout: 30_000,
})

export default api

export const setupApi = (token?: string) => {
  token = token || getCookie(process.env.COOKIE_ACCESS_TOKEN as string)
  return api.extend({
    hooks: {
      beforeRequest: [
        (request) => {
          if (token) request.headers.set('Authorization', `Token ${token}`)
        },
      ],
    },
  })
}

export const thunkRequest = async <T>(thunkAPI: any, callback: () => Promise<T>): Promise<T> => {
  try {
    return await callback()
  } catch (err: any) {
    return thunkAPI.rejectWithValue(await err.response?.json())
  }
}
