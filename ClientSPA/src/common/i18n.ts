import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'

i18n.use(initReactI18next).init({
	keySeparator: false,
	interpolation: {
		escapeValue: false,
	},
})

export const availableLang = ['vi', 'en']
export const cacheLang =
	localStorage.getItem('displayLanguage') &&
	availableLang.includes(localStorage.getItem('displayLanguage') as string)
		? (localStorage.getItem('displayLanguage') as string)
		: 'vi'

import(`asset/translation/${cacheLang}.json`).then((data: unknown) => {
	i18n.addResourceBundle(cacheLang, 'translation', data, true)
	localStorage.setItem('displayLanguage', cacheLang)
	i18n.changeLanguage(cacheLang)
})

export default i18n
