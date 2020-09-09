import { cacheLang, availableLang } from 'i18n'
export interface State {
	loadedTranPkg: string[]
	currentLang: string
	supportedLang: string[]
}

export const initialState: State = {
	loadedTranPkg: [cacheLang],
	currentLang: cacheLang,
	supportedLang: [...availableLang],
}