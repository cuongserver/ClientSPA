import { Reducer, Action } from 'redux'
import {appStoreInitState} from 'constants/store-init-state'
import {StoreStateAlert, StoreActionsAlert} from 'types/store.alert'

export const reducer: Reducer<StoreStateAlert> = (
	currentState: StoreStateAlert | undefined,
	incomingAction: Action
) => {
	if (currentState === undefined) {
		return appStoreInitState.alert
	}
	const action = incomingAction as StoreActionsAlert

	switch (action.type) {
		case 'SHOW_ALERT':
			return {
				open: true,
				severity: action.payload.severity,
				message: action.payload.message
			} as StoreStateAlert
		case 'HIDE_ALERT':
			return {
				...currentState, open: false
			} as StoreStateAlert
		default:
			return { ...currentState }
	}
}