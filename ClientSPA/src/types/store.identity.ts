import { AnyAction } from "redux";
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

export interface StoreActionLogin extends AnyAction {
	type: 'LOGIN'
}

export interface StoreActionLogout extends AnyAction {
	type: 'LOGOUT'
}

export type StoreActionsIdentity = StoreActionLogin | StoreActionLogout