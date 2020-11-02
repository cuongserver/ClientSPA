export interface StoreStateLocale {
	loadedTranPkg: string[]
	currentLang: string
	supportedLang: string[]
}

export interface StoreActionChangeLocale {
	type: 'CHANGE_LOCALE__NORMAL' | 'CHANGE_LOCALE__EPIC'
	payload: string
}