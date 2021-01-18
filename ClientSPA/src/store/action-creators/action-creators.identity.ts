import { Dispatch } from 'redux'
import { StoreActionLogin, StoreActionLogout, Identity } from 'types/store.identity'

export const actionCreatorsIdentity = {
	login: (dispatch: Dispatch, payload: Identity) => {
		dispatch({
			type: 'LOGIN',
			payload: payload
		} as StoreActionLogin)
	},
	logout: (dispatch: Dispatch) => {
		dispatch({
			type: 'LOGOUT',
		} as StoreActionLogout)
	}
}