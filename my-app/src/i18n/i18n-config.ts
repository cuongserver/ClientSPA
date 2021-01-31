import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { localStorageItems } from 'constants/local-storage-items'
i18n.use(initReactI18next).init({
	keySeparator: false,
})

const availableI18nPackages = ['vi', 'en']
const startUpLang =
	localStorage.getItem(localStorageItems.currentLang) &&
	availableI18nPackages.includes(
		localStorage.getItem(localStorageItems.currentLang) as string
	)
		? (localStorage.getItem('displayLanguage') as string)
		: 'vi'

import(`i18n/sources/${startUpLang}.json`).then((data: unknown) => {
	i18n.addResourceBundle(startUpLang, 'translation', data, true)
	localStorage.setItem(localStorageItems.currentLang, startUpLang)
	i18n.changeLanguage(startUpLang)
})

export { i18n, availableI18nPackages, startUpLang }
