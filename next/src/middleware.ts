import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
	if (process.env.STAGING !== 'true') {
		return NextResponse.next()
	}

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

export const config = {
	matcher: '/:path*',
}
