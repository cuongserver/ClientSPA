/**import 3rd party library */
import { Reducer, Action } from 'redux'
/**import from inside project */
import * as AlertModel from 'model/store-model/alert'

export const initialState: AlertModel.State = {
	open: false,
	severity: 'info'
}



export const reducer: Reducer<AlertModel.State> = (
	currentState: AlertModel.State | undefined,
	incomingAction: Action
) => {
	if (currentState === undefined) {
		return initialState
	}
	const action = incomingAction as AlertModel.KnownAction

	switch (action.type) {
		case AlertModel.Actions.Show:
			return {
				open: true,
				severity: action.payload.severity,
				message: action.payload.message
			} as AlertModel.State
		case AlertModel.Actions.Hide:
			return {
				...currentState, open: false
			} as AlertModel.State
		default:
			return { ...currentState }
	}
}