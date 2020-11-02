import { Reducer, Action } from 'redux'
import { appStoreInitState } from 'constants/store-init-state'
import { StoreStateLoading, StoreActionsLoading } from 'types/store.loading'

export const reducer: Reducer<StoreStateLoading> = (
	currentState: StoreStateLoading | undefined,
	incomingAction: Action
) => {
	if (currentState === undefined) {
		return appStoreInitState.loading
	}
	const action = incomingAction as StoreActionsLoading

	switch (action.type) {
		case 'SHOW_LOADING':
			return {
				loading: true,
			} as StoreStateLoading
		case 'HIDE_LOADING':
			return {
				loading: false,
			} as StoreStateLoading
		default:
			return currentState
	}
}
