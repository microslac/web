import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import api from '@/services/api'

const ANONYMOUS_PATHS = ['/signin', '/signup', '/signin/teams']

export async function middleware(request: NextRequest) {
  const redirect = (pathname: string) => {
    const url = request.nextUrl.clone()
    url.pathname = pathname
    return NextResponse.redirect(url)
  }

  if (!ANONYMOUS_PATHS.find((path) => path === request.nextUrl.pathname)) {
    let verified = false
    const token = request.cookies.get(process.env.COOKIE_AUTH_TOKEN as string)
    if (token) {
      const resp = await api.post('auth/verify', {
        hooks: {
          beforeRequest: [(req) => req.headers.set('Authorization', `Token ${token.value}`)],
        },
      })
      const data = await resp.json<{ ok: boolean }>()
      verified = data.ok
    }
    if (!verified) return redirect('/signin')
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', request.nextUrl.pathname)
  requestHeaders.set('x-origin', request.nextUrl.origin)
  requestHeaders.set('x-url', request.url)

  return NextResponse.next({
    request: { headers: requestHeaders },
  })
}

export const config = {
  matcher: ['/client/:path*', '/signin/:path*', '/signup/:path*'],
}
