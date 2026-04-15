import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'fr', 'de']
const defaultLocale = 'en'
const blockedRoutes = ['services', 'legals']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (process.env.STAGING === 'true') {
    const authHeader = request.headers.get('authorization')
    const isBasic = authHeader?.startsWith('Basic ')

    if (isBasic) {
      const [username, password] = atob(authHeader!.split(' ')[1]).split(':')
      if (
        username === process.env.STAGING_USER &&
        password === process.env.STAGING_PASSWORD
      ) {
      } else {
        return new NextResponse('Invalid credentials', {
          status: 401,
          headers: { 'WWW-Authenticate': 'Basic realm="Staging"' },
        })
      }
    } else {
      return new NextResponse('Authentication required', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Staging"' },
      })
    }
  }

  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url))
  }

  const segments = pathname.split('/').filter(Boolean)
  const first = segments[0]
  const second = segments[1]
  const isLocale = locales.includes(first)

  if (!isLocale && blockedRoutes.includes(first)) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (isLocale && blockedRoutes.includes(second)) {
    return NextResponse.redirect(new URL(`/${first}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
}