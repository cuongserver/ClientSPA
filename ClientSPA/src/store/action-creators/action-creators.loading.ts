import { Dispatch } from 'redux'
import { StoreActionShowLoading, StoreActionHideLoading } from 'types/store.loading'

export const actionCreatorsLoading = {
	activateLoader: (dispatch: Dispatch) => {
		dispatch({
			type: 'SHOW_LOADING',
		} as StoreActionShowLoading)
	},
	deactivateLoader: (dispatch: Dispatch) => {
		dispatch({
			type: 'HIDE_LOADING',
		} as StoreActionHideLoading)
	}
}