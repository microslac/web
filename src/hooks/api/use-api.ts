import { useMemo } from 'react'
import { useCookie } from 'react-use'
import { HTTPError } from 'ky'
import api, { baseApi } from '@/services/api'

type APIError = {
  error: string
  ok: boolean
}

type CookieKey = 'auth' | 'access'

export const useApi = (key: CookieKey = 'access') => {
  let cookie = process.env.COOKIE_ACCESS_TOKEN
  if (key === 'auth') cookie = process.env.COOKIE_AUTH_TOKEN

  const [token] = useCookie(cookie as string)

  return useMemo(
    () =>
      api.extend({
        hooks: {
          beforeRequest: [
            (request) => {
              if (token) request.headers.set('Authorization', `Token ${token}`)
            },
          ],
        },
      }),
    [token],
  )
}

export const useBaseApi = (key: CookieKey = 'access') => {
  let cookie = process.env.COOKIE_ACCESS_TOKEN
  if (key === 'auth') cookie = process.env.COOKIE_AUTH_TOKEN

  const [token] = useCookie(cookie as string)

  return useMemo(
    () =>
      baseApi.extend({
        hooks: {
          beforeRequest: [
            (request) => {
              if (token) request.headers.set('Authorization', `Token ${token}`)
            },
          ],
        },
      }),
    [token],
  )
}

export const extractError = async <T extends APIError>(error: HTTPError) => {
  const body = (await error.response.json()) as T
  return body.error
}
