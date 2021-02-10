export interface AuthRequest {
	loginName: string
	password: string
}

export interface AuthResponse {
	displayName: string
	jwToken: string
	permissions: string[]
	result: string
}

export type AuthMessage = 'auth-success' | 'auth-failed'
