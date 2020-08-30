import { Dispatch } from "redux"
import { AppAction } from "model/store-model"

export interface State {
	loading: boolean
}

export const actionCreators = {
	activateLoader: (dispatch: Dispatch, state: boolean) => {
		dispatch({
			type: 'TRIGGER_LOADINGSCREEN',
			payload: state,
			fromMiddleWare: false,
		} as AppAction<boolean>)
	}
}