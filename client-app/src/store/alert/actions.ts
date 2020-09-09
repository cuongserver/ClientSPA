import { Dispatch } from 'redux'

export enum ActionTypes {
	Show = 'SHOW_ALERT',
	Hide = 'HIDE_ALERT'
}

export interface ShowAlertAction {
	type: ActionTypes.Show
	payload: {
		severity: 'error' | 'success' | 'warning' | 'info'
		message: string
	}
}

export interface HideAlertAction {
	type: ActionTypes.Hide
}

export const actionCreators = {
	showAlert: (
		dispatch: Dispatch,
		severity: 'error' | 'success' | 'warning' | 'info',
		message: string,
	): void => {
		dispatch({
			type: ActionTypes.Show,
			payload: {
				severity: severity,
				message: message,
			},
		} as ShowAlertAction)
	},
	hideAlert: (dispatch: Dispatch): void => {
		dispatch({
			type: ActionTypes.Hide,
		} as HideAlertAction)
	}
}

export type KnownAction = ShowAlertAction | HideAlertAction
