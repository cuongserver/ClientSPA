import { AnyAction } from "redux";
export interface StoreStateLocale {
	loadedTranPkg: string[]
	currentLang: string
	supportedLang: string[]
}

export interface StoreActionChangeLocale extends AnyAction {
	type: 'CHANGE_LOCALE__NORMAL' | 'CHANGE_LOCALE__EPIC'
	payload: string
}