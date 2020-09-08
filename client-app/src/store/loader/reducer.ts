import { Reducer } from 'redux'
import { State, initialState } from './state'
import { KnownAction, ActionTypes } from './actions'


export const reducers: Reducer<State, KnownAction> = (state: State | undefined, incomingAction: KnownAction): State => {
	if (state === undefined) {
		return initialState
	}

	switch (incomingAction.type) {
		case ActionTypes.ToggleLoader:
			return { loading: incomingAction.payload }

		default:
			return state
	}
}