import {useCookie} from 'react-use'

export const useAppCookies = () => {
  const [authCookie, updateAuthCookie, deleteAuthCookie] = useCookie(process.env.COOKIE_AUTH_TOKEN as string)
  const [accessCookie, updateAccessCookie, deleteAccessCookie] = useCookie(process.env.COOKIE_ACCESS_TOKEN as string)
  const [refreshCookie, updateRefreshCookie, deleteRefreshCookie] = useCookie(process.env.COOKIE_REFRESH_TOKEN as string)

  const deleteAllCookies = () => {
    deleteAuthCookie()
    deleteAccessCookie()
    deleteRefreshCookie()
  }

  return {
    authCookie,
    accessCookie,
    refreshCookie,
    updateAuthCookie,
    updateAccessCookie,
    updateRefreshCookie,
    deleteAllCookies
  }
}
