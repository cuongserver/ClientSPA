import { AnyAction } from "redux";
export interface Identity {
	id: string
	accessRights?: string[]
	userName?: string
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
	type: 'LOGOUT',
	payload: Identity
}

export type StoreActionsIdentity = StoreActionLogin | StoreActionLogout 