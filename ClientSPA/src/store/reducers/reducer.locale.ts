import { Reducer, Action } from 'redux'
import { appStoreInitState } from 'constants/store-init-state'
import { StoreStateLocale, StoreActionChangeLocale } from 'types/store.locale'

export const reducer: Reducer<StoreStateLocale> = (
	currentState: StoreStateLocale | undefined,
	incomingAction: Action
) => {
	if (currentState === undefined) {
		return appStoreInitState.locale
	}
	const action = incomingAction as StoreActionChangeLocale
	const newState = { ...currentState }
	switch (action.type) {
		case 'CHANGE_LOCALE__NORMAL':
			const lang = action.payload
			newState.currentLang = lang
			if (!newState.loadedTranPkg.includes(lang))
				newState.loadedTranPkg.push(lang)
			return { ...newState }
		default:
			return currentState
	}
}
