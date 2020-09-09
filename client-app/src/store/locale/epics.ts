import { AppState } from './../common';
import { Epic } from 'redux-observable'
import { KnownAction, ActionTypes } from './actions'
import { filter, switchMap } from 'rxjs/operators'
import i18n from 'i18n'

export const epics: Epic<KnownAction, KnownAction, AppState> = (action$, store) => {
	return action$.pipe(
		filter(action => action.type === ActionTypes.ChangeLanguageMiddleware),
		switchMap(async (action) => {
			const state = store.value.locale
			let targetLang = action.payload
			let sideEffectFail = false
			if (!state.supportedLang.includes(targetLang))
				targetLang = state.currentLang
			if (state.loadedTranPkg.includes(targetLang)) {
				i18n.changeLanguage(targetLang)
				localStorage.setItem('displayLanguage', targetLang)
			}
			else {
				await import(`asset/translation/${targetLang}.json`).then((data: unknown) => {
					i18n.addResourceBundle(targetLang, 'translation', data, true)
					i18n.changeLanguage(targetLang)
					localStorage.setItem('displayLanguage', targetLang)
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
				}).catch((error: unknown) => {
					sideEffectFail = true
				})
			}
			if (sideEffectFail) {
				return {
					type: ActionTypes.ChangeLanguage,
					payload: targetLang
				} as KnownAction
			}
			else {
				return {
					type: ActionTypes.ChangeLanguageFail,
					payload: targetLang
				} as KnownAction
			}

		})
	)
}