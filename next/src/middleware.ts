import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'fr', 'de']
const defaultLocale = 'en'

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	if (process.env.STAGING == 'true') {
		const authHeader = request.headers.get('authorization')

		if (!authHeader || !authHeader.startsWith('Basic ')) {
			return new NextResponse('Authentication required', {
				status: 401,
				headers: {
					'WWW-Authenticate': 'Basic realm="Staging"',
				},
			})
		}

		const base64Credentials = authHeader.split(' ')[1]
		const credentials = atob(base64Credentials)
		const [username, password] = credentials.split(':')

		if (
			username === process.env.STAGING_USER &&
			password === process.env.STAGING_PASSWORD
		) {
			return NextResponse.next()
		}

		return new NextResponse('Invalid credentials', {
			status: 401,
			headers: {
				'WWW-Authenticate': 'Basic realm="Staging"',
			},
		})
	}

	if (pathname === "/") {
		return NextResponse.redirect(
			new URL(`/${defaultLocale}`, request.url)
		)
	}

	const segments = pathname.split('/').filter(Boolean)
	const first = segments[0]
	const second = segments[1]
	const isLocale = locales.includes(first)
	const blockedRoutes = ["services", "legals"]

	if (!isLocale && blockedRoutes.includes(first)) {
		return NextResponse.redirect(new URL("/", request.url))
	}

	if (isLocale && blockedRoutes.includes(second)) {
		return NextResponse.redirect(
			new URL(`/${first}`, request.url)
		)
	}

	return NextResponse.next()

}

export const config = {
	matcher: '/:path*',
}
