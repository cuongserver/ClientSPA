import { Reducer, Action } from 'redux'
import { State, initialState } from './state'
import { KnownAction, ActionTypes } from './actions'


export const reducer: Reducer<State, Action> = (state: State | undefined, incomingAction: Action): State => {
	if (state === undefined) {
		return initialState
	}
	const action = incomingAction as KnownAction
	switch (incomingAction.type) {
		case ActionTypes.ChangeLanguage:
			const newState = { ...state }
			const lang = action.payload as string
			if (!newState.loadedTranPkg.includes(lang))
				newState.loadedTranPkg.push(lang)
			return { ...newState }
		default:
			return state
	}
}