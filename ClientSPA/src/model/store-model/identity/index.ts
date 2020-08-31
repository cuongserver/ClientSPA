import { Dispatch } from 'redux'

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

export enum Actions {
	Login = 'LOGIN',
	Logout = 'LOGOUT',
}

export interface LoginAction {
	type: Actions.Login
}

export interface LogoutAction {
	type: Actions.Logout
}

export const actionCreators = {
	login: (dispatch: Dispatch) => {
		dispatch({
			type: Actions.Login,
		} as LoginAction)
	},
	logout: (dispatch: Dispatch) => {
		dispatch({
			type: Actions.Logout,
		} as LogoutAction)
	},
}
export type KnownAction = LoginAction | LogoutAction
