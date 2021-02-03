export interface AuthRequest {
	loginName: string
	password: string
}

export interface AuthResponse {
	displayName: string
	jwToken: string
	roles: string[]
	result: AuthMessage
}

export type AuthMessage = 'auth-success' | 'auth-failed'
