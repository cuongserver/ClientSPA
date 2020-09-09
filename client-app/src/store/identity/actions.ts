import { Dispatch } from 'redux'

export enum ActionTypes {
	Login = 'LOGIN',
	Logout = 'LOGOUT',
}

export interface LoginAction {
	type: ActionTypes.Login
}

export interface LogoutAction {
	type: ActionTypes.Logout
}

export type KnownAction = LoginAction | LogoutAction

export const actionCreators = {
	login: (dispatch: Dispatch) => {
		sessionStorage.setItem('isLoggedIn', 'true')
		dispatch({
			type: ActionTypes.Login,
		} as LoginAction)
	},
	logout: (dispatch: Dispatch) => {
		sessionStorage.removeItem('isLoggedIn')
		dispatch({
			type: ActionTypes.Logout,
		} as LogoutAction)
	},
}

