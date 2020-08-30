export interface State {
	isAuthenticated: boolean
	identity?: Identity
}

export interface Identity {
	code: string
	authority: string
	name?: string
	authToken?: string
}