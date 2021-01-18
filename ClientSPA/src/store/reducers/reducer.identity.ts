import { Reducer, Action } from 'redux'
import { appStoreInitState } from 'constants/store-init-state'
import { StoreStateIdentity, StoreActionsIdentity } from 'types/store.identity'

export const reducerIdentity: Reducer<StoreStateIdentity> = (
	currentState: StoreStateIdentity | undefined,
	incomingAction: Action
) => {
	if (currentState === undefined) {
		return appStoreInitState.identity
	}
	const action = incomingAction as StoreActionsIdentity

	switch (action.type) {
		case 'LOGIN':
			return {
				isAuthenticated: true,
				identity: action.payload,
			} as StoreStateIdentity
		case 'LOGOUT':
			return {
				isAuthenticated: false,
			} as StoreStateIdentity
		default:
			return currentState
	}
}
