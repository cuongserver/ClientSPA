import { Reducer } from 'redux'
import { State, initialState } from './state'
import { KnownAction, ActionTypes } from './actions'


export const reducers: Reducer<State, KnownAction> = (state: State | undefined, incomingAction: KnownAction): State => {
	if (state === undefined) {
		return initialState
	}

	switch (incomingAction.type) {
		case ActionTypes.ChangeLanguage:
			const newState = { ...state }
			const lang = incomingAction.payload as string
			if (!newState.loadedTranPkg.includes(lang))
				newState.loadedTranPkg.push(lang)
			return { ...newState }
		default:
			return state
	}
}