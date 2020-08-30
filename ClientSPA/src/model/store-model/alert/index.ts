import { Dispatch } from 'redux'
export interface State {
	open: boolean
	severity: 'error' | 'success' | 'warning' | 'info'
	message?: string
}


export enum Actions {
	Show = 'SHOW_ALERT',
	Hide = 'HIDE_ALERT'
}

export const actionCreators = {
	showAlert: (
		dispatch: Dispatch,
		message: string,
		severity: 'error' | 'success' | 'warning' | 'info'
	): void => {
		dispatch({
			type: Actions.Show,
			payload: {
				severity: severity,
				message: message,
			},
		} as ShowAlertAction)
	},
	hideAlert: (dispatch: Dispatch): void => {
		dispatch({
			type: Actions.Hide,
		} as HideAlertAction)
	}
}

export interface ShowAlertAction {
	type: Actions.Show
	payload: {
		severity: 'error' | 'success' | 'warning' | 'info'
		message: string
	}
}

export interface HideAlertAction {
	type: Actions.Hide
}

export type KnownAction = ShowAlertAction | HideAlertAction