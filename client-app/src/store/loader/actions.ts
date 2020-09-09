import { Dispatch } from 'redux'

export enum ActionTypes {
	ToggleLoader = 'TOGGLE_LOADER'
}

export interface ToggleLoaderAction {
	type: ActionTypes.ToggleLoader
	payload: boolean
}

export const actionCreators = {
	toggleLoader: (dispatch: Dispatch, status: boolean) => {
		dispatch({
			type: ActionTypes.ToggleLoader,
			payload: status
		} as ToggleLoaderAction)
	},
}

export type KnownAction = ToggleLoaderAction
