import { Dispatch } from 'redux'
import { StoreActionShowAlert, StoreActionHideAlert } from 'types/store.alert'

export const actionCreatorsAlert = {
	showAlert: (
		dispatch: Dispatch,
		message: string,
		severity: 'error' | 'success' | 'warning' | 'info'
	): void => {
		dispatch({
			type: 'SHOW_ALERT',
			payload: {
				severity: severity,
				message: message,
			},
		} as StoreActionShowAlert)
	},
	hideAlert: (dispatch: Dispatch): void => {
		dispatch({
			type: 'HIDE_ALERT',
		} as StoreActionHideAlert)
	}
}