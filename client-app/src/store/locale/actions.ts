import { Dispatch } from 'redux'

export enum ActionTypes {
	ChangeLanguageMiddleware = 'CHANGE_LANGUAGE_MIDDLEWARE',
	ChangeLanguage = 'CHANGE_LANGUAGE',
	ChangeLanguageFail = 'CHANGE_LANGUAGE_FAIL'
}

export interface ChangeLanguageAction {
	type: ActionTypes.ChangeLanguageMiddleware | ActionTypes.ChangeLanguage | ActionTypes.ChangeLanguageFail
	payload: string
}

export const actionCreators = {
	changeLanguage: (dispatch: Dispatch, lang: string) => {
		dispatch({
			type: ActionTypes.ChangeLanguageMiddleware,
			payload: lang
		} as ChangeLanguageAction)
	},
}

export type KnownAction = ChangeLanguageAction

