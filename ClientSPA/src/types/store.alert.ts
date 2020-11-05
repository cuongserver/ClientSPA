import { AnyAction } from 'redux'

export interface StoreStateAlert {
	open: boolean
	severity: 'error' | 'success' | 'warning' | 'info'
	message?: string
}

export interface StoreActionShowAlert extends AnyAction {
	type: 'SHOW_ALERT'
	payload: {
		severity: 'error' | 'success' | 'warning' | 'info'
		message: string
	}
}

export interface StoreActionHideAlert {
	type: 'HIDE_ALERT'
}

export type StoreActionsAlert = StoreActionShowAlert | StoreActionHideAlert
