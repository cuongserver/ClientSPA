import { Dispatch } from 'redux'
import { AppAction } from 'model/store-model'

export interface State {
	loadedTranPkg: string[],
	currentLang: string,
	supportedLang: string[]
}


export const actionCreators = {
	changeLanguage: (dispatch: Dispatch, lang: string) => {
		dispatch({
			type: 'CHANGE_LANGUAGE',
			payload: lang,
			fromMiddleWare: false,
		} as AppAction<string>)
	}
}