import { Reducer } from 'redux'
import { AppAction, AppState } from 'model/base'
import i18n, { cacheLang, availableLang } from 'common/i18n'
import * as LocaleModel from 'model/locale'
import { Epic } from 'redux-observable'
import { tap, map, filter } from 'rxjs/operators'

export const initialState: LocaleModel.State = {
	loadedTranPkg: [cacheLang],
	currentLang: cacheLang,
	supportedLang: [...availableLang],
}

export const reducer: Reducer<LocaleModel.State> = (
	state: LocaleModel.State | undefined,
	incomingAction: AppAction<string>
): LocaleModel.State => {
	if (state === undefined) {
		return initialState
	}

	if (
		incomingAction.type === 'CHANGE_LANGUAGE' &&
		incomingAction.fromMiddleWare === true
	) {
		const newState = { ...state }
		const lang = incomingAction.payload as string
		newState.currentLang = lang
		if (!newState.loadedTranPkg.includes(lang))
			newState.loadedTranPkg.push(lang)
		return { ...newState }
	}
	return state
}

export const localeEpic: Epic<
	AppAction<string>,
	AppAction<string>,
	AppState
> = (action$, store) => {
	return action$.pipe(
		filter(
			(action) =>
				action.type === 'CHANGE_LANGUAGE' && action.fromMiddleWare === false
		),
		tap((action) => {
			const state = store.value.locale
			let targetLang = action.payload as string
			if (!state.supportedLang.includes(targetLang))
				targetLang = state.currentLang
			if (state.loadedTranPkg.includes(targetLang)) {
				i18n.changeLanguage(targetLang)
				localStorage.setItem('displayLanguage', targetLang)
			} else {
				import(`asset/translation/${targetLang}.json`)
					.then((data) => {
						i18n.addResourceBundle(targetLang, 'translation', data, true)
						i18n.changeLanguage(targetLang)
						localStorage.setItem('displayLanguage', targetLang)
					})
					.catch((error) => {
						console.log(error)
					})
			}
		}),
		map((action) => {
			return {
				...action,
				fromMiddleWare: true,
			}
		})
	)
}
