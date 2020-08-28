import { Reducer } from 'redux'
import { AppAction, AppState } from 'model/base'
import i18n, { cacheLang, availableLang } from 'common/i18n'
import * as LocaleModel from 'model/locale'
import { Epic } from 'redux-observable'
import { filter, switchMap } from 'rxjs/operators'

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
		incomingAction.fromMiddleWare === true &&
		incomingAction.error === false
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
		filter((action) => {
			return (
				action.type === 'CHANGE_LANGUAGE' && action.fromMiddleWare === false
			)
		}),
		switchMap(async (action) => {
			const state = store.value.locale
			let targetLang = action.payload as string
			let sideEffectFail = false
			if (!state.supportedLang.includes(targetLang))
				targetLang = state.currentLang
			if (state.loadedTranPkg.includes(targetLang)) {
				i18n.changeLanguage(targetLang)
				localStorage.setItem('displayLanguage', targetLang)
			} else {
				await import(`asset/translation/${targetLang}.json`)
					.then((data: unknown) => {
						i18n.addResourceBundle(targetLang, 'translation', data, true)
						i18n.changeLanguage(targetLang)
						localStorage.setItem('displayLanguage', targetLang)
					})
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.catch((error: unknown) => {
						sideEffectFail = true
					})
			}
			return {
				...action,
				fromMiddleWare: true,
				error: sideEffectFail,
			}
		})
	)
}
