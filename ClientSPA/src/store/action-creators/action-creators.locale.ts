import { Dispatch } from 'redux'
import { StoreActionChangeLocale } from 'types/store.locale'

export const actionCreatorsLocale = {
	changeLocale: (dispatch: Dispatch, lang: string) => {
		dispatch({
			type: 'CHANGE_LOCALE__EPIC',
			payload: lang
		} as StoreActionChangeLocale)
	}
}