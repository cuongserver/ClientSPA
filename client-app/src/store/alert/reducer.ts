import { Reducer, Action } from 'redux'
import { State, initialState } from './state'
import { KnownAction, ActionTypes } from './actions'


export const reducer: Reducer<State, Action> = (state: State | undefined, incomingAction: Action): State => {
	if (state === undefined) {
		return initialState
	}

	const action = incomingAction as KnownAction
	switch (action.type) {
		case ActionTypes.Show:
			return {
				open: true,
				severity: action.payload.severity,
				message: action.payload.message
			}
		case ActionTypes.Hide:
			return {
				...state, open: false
			}
		default:
			return state
	}
}