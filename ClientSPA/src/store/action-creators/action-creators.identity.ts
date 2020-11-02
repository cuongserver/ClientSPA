import { Dispatch } from 'redux'
import { StoreActionLogin, StoreActionLogout } from 'types/store.identity'

export const actionCreatorsIdentity = {
	login: (dispatch: Dispatch) => {
		dispatch({
			type: 'LOGIN',
		} as StoreActionLogin)
	},
	logout: (dispatch: Dispatch) => {
		dispatch({
			type: 'LOGOUT',
		} as StoreActionLogout)
	}
}