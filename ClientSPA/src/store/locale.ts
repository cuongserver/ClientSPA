import { Action, Reducer } from 'redux'
import i18n from 'infrastructure/i18n'


export interface IState {
	loadedTranPkg: string[],
	currentLang: string,
	supportedLang: string[]
}


export interface ChangeLanguageAction {
	type: 'CHANGE_LANGUAGE',
	payload: string
}

export const initialState: IState = {
	loadedTranPkg: [localStorage.getItem('displayLanguage') || 'vi'],
	currentLang: localStorage.getItem('displayLanguage') || 'vi',
	supportedLang: ['vi', 'en']
}

import(`asset/translation/${initialState.currentLang}.json`).then((data: unknown) => {
	i18n.addResourceBundle(initialState.currentLang, 'translation', data, true)
	localStorage.setItem('displayLanguage', initialState.currentLang)
})

export type KnownAction = ChangeLanguageAction

export const actionCreators = {
	changeLanguage: (lang: string): ChangeLanguageAction => {
		return {
			type: 'CHANGE_LANGUAGE',
			payload: lang
		}
	}
}

export const reducer: Reducer<IState> = (state: IState | undefined, incomingAction: Action): IState => {
	if (state === undefined) {
		return initialState
	}
	const newState = { ...state }
	const action = incomingAction as KnownAction;
	let lang = action.payload;
	if (!newState.supportedLang.includes(lang)) lang = initialState.currentLang
	if (newState.loadedTranPkg.includes(lang)) {
		i18n.changeLanguage(lang)
	}
	else {
		import(`asset/translation/${lang}.json`)
			.then(data => {
				i18n.addResourceBundle(lang, 'translation', data, true)
				i18n.changeLanguage(lang)
				newState.loadedTranPkg.push(lang)
			})
	}
	localStorage.setItem('displayLanguage', lang)
	newState.currentLang = lang
	return { ...newState }
}
