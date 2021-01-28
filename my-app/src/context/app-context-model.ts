interface AuthState {
	isAuth: boolean
	switchAuthState: () => void
}

interface AppContext {
	auth: AuthState
}

export type { AuthState, AppContext }
