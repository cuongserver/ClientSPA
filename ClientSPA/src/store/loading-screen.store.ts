/**import 3rd party library */
import { Reducer } from 'redux'
/**import from inside project */
import * as LoadingScreenStore from 'model/loading-screen'
import { AppAction } from 'model/base'

export const initialState: LoadingScreenStore.State = {
	loading: false,
}

export const reducer: Reducer<LoadingScreenStore.State> = (
	state: LoadingScreenStore.State | undefined,
	incomingAction: AppAction<string>
) => {
	if (state === undefined) {
		return initialState
	}
	if (
		incomingAction.type !== 'TRIGGER_LOADINGSCREEN' ||
		incomingAction.payload === undefined
	)
		return {
			...state,
			loading: (state as LoadingScreenStore.State).loading,
		} as LoadingScreenStore.State
	if (incomingAction.payload === 'activate') return { loading: true }
	if (incomingAction.payload === 'deactivate') return { loading: false }
	return { ...state } as LoadingScreenStore.State
}
