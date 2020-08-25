import { Reducer, AnyAction } from 'redux'
import { PureAction, AppThunkAction, AppState } from 'model/base'
import i18n, { cacheLang, availableLang } from 'infrastructure/i18n'
import * as LocaleModel from 'model/locale'
import { ThunkAction } from 'redux-thunk'

export const initialState: LocaleModel.State = {
	loadedTranPkg: [cacheLang],
	currentLang: cacheLang,
	supportedLang: [...availableLang]
}

export const actionCreators = {
	changeLanguage: (lang: string): AppThunkAction<PureAction<string>> => (dispatch, getState) => {
		const state = getState().locale
		let targetLang = lang
		if (!state.supportedLang.includes(lang)) targetLang = state.currentLang
		if (state.loadedTranPkg.includes(targetLang)) {
			i18n.changeLanguage(targetLang, () => {
				dispatch({ type: 'CHANGE_LANGUAGE', payload: targetLang, error: false })
				localStorage.setItem('displayLanguage', targetLang)
			})
		}
		else {
			import(`asset/translation/${targetLang}.json`)
				.then(data => {
					i18n.addResourceBundle(targetLang, 'translation', data, true)
					i18n.changeLanguage(targetLang)
					localStorage.setItem('displayLanguage', targetLang)
					dispatch({ type: 'CHANGE_LANGUAGE', payload: targetLang, error: false })
				})
		}
	}
}

export const reducer: Reducer<LocaleModel.State> = (state: LocaleModel.State | undefined, incomingAction: PureAction<string>): LocaleModel.State => {
	if (state === undefined) {
		return initialState
	}
	const newState = { ...state }
	const lang = incomingAction.payload as string
	newState.currentLang = lang
	if (!newState.loadedTranPkg.includes(lang)) newState.loadedTranPkg.push(lang)
	return { ...newState }
}

// const changeLanguage = (lang: string): ThunkAction<{}, AppState, {}, AnyAction> => (dispatch, getState, extraArg) => {

// 	const state = getState().locale
// 	let targetLang = lang
// 	if (!state.supportedLang.includes(lang)) targetLang = state.currentLang
// 	if (state.loadedTranPkg.includes(targetLang)) {
// 		i18n.changeLanguage(targetLang, () => {
// 			dispatch({ type: 'CHANGE_LANGUAGE', payload: targetLang, error: false })
// 			localStorage.setItem('displayLanguage', targetLang)
// 		})
// 	}
// 	else {
// 		import(`asset/translation/${targetLang}.json`)
// 			.then(data => {
// 				i18n.addResourceBundle(targetLang, 'translation', data, true)
// 				i18n.changeLanguage(targetLang)
// 				localStorage.setItem('displayLanguage', targetLang)
// 				dispatch({ type: 'CHANGE_LANGUAGE', payload: targetLang, error: false })
// 			})
// 	}
// 	return {}
// }