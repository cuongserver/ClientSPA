
export interface Identity {
	id: string
	accessRights?: string[]
	name?: string
	authToken?: string
}

export interface StoreStateIdentity {
	isAuthenticated: boolean
	identity?: Identity
}

export interface StoreActionLogin {
	type: 'LOGIN'
}

export interface StoreActionLogout {
	type: 'LOGOUT'
}

export type StoreActionsIdentity = StoreActionLogin | StoreActionLogout