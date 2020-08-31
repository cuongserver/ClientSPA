/**import 3rd party library */
import { Reducer, Action } from 'redux'
/**import from inside project */
import * as IdentityModel from 'model/store-model/identity'

export const initialState: IdentityModel.State = {
	isAuthenticated: false,
}

export const reducer: Reducer<IdentityModel.State> = (
	currentState: IdentityModel.State | undefined,
	incomingAction: Action
) => {
	if (currentState === undefined) {
		return initialState
	}
	const action = incomingAction as IdentityModel.KnownAction

	switch (action.type) {
		case IdentityModel.Actions.Login:
			return {
				isAuthenticated: true,
			} as IdentityModel.State
		case IdentityModel.Actions.Logout:
			return {
				isAuthenticated: false,
			} as IdentityModel.State
		default:
			return { ...currentState }
	}
}
