import { StoreStateApp } from 'types/store.app'
import { Epic } from 'redux-observable'
import { i18n } from 'configs/config.i18n'
import { StoreActionChangeLocale } from 'types/store.locale'
import { filter, switchMap } from 'rxjs/operators'
import { AnyAction } from 'redux'

export const localeEpic: Epic<AnyAction, AnyAction, StoreStateApp> = (
	actions$,
	store
) => {
	return actions$.pipe(
		filter((action) => {
			return action.type === 'CHANGE_LOCALE__EPIC'
		}),
		switchMap(async (action) => {
			const state = store.value
			let targetLang = action.payload as string
			let sideEffectFail = false
			if (!state.locale.supportedLang.includes(targetLang))
				targetLang = state.locale.currentLang
			if (state.locale.loadedTranPkg.includes(targetLang)) {
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
				type: 'CHANGE_LOCALE__NORMAL',
				payload: sideEffectFail ? state.locale.currentLang : action.payload,
			} as StoreActionChangeLocale
		})
	)
}
