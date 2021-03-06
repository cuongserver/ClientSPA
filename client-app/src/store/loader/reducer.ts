import { Reducer, Action } from 'redux'
import { State, initialState } from './state'
import { KnownAction, ActionTypes } from './actions'


export const reducer: Reducer<State, Action> = (state: State | undefined, incomingAction: Action): State => {
	if (state === undefined) {
		return initialState
	}
	const action = incomingAction as KnownAction
	switch (incomingAction.type) {
		case ActionTypes.ToggleLoader:
			return { loading: action.payload }

		default:
			return state
	}
}