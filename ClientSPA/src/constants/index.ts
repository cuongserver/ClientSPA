//#region import
import { StoreStateApp } from 'types/store.app'
import { cacheLang, availableLang } from 'configs/config.i18n'


//#endregion

//#region declaration
export const appStoreInitState: StoreStateApp = {
	alert: {
		open: false,
		severity: 'info'
	},
	loading: {
		loading: false,
	},
	identity: {
		isAuthenticated: false,
	},
	locale: {
		loadedTranPkg: [cacheLang],
		currentLang: cacheLang,
		supportedLang: [...availableLang],
	}
}

//#endregion