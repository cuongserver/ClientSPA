/**import 3rd party library */
import { Reducer } from 'redux'
/**import from inside project */
import * as LoadingScreenStore from 'model/store-model/loading-screen'
import { AppAction } from 'model/store-model'

export const initialState: LoadingScreenStore.State = {
	loading: false,
}


export const reducer: Reducer<LoadingScreenStore.State> = (
	state: LoadingScreenStore.State | undefined,
	incomingAction: AppAction<boolean>
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

	return { loading: incomingAction.payload } as LoadingScreenStore.State
}
