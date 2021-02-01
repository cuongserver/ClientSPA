import React from 'react'
import {
	AuthState,
	AppContext,
	I18n,
	EntryModule,
} from 'context/app-context-model'
import _ from 'lodash'
import { availableI18nPackages, startUpLang, i18n } from 'i18n/i18n-config'
import { localStorageItems } from 'constants/local-storage-items'
import { Subject } from 'rxjs'

const RootContext = React.createContext<AppContext | undefined>(undefined)

class Context extends React.PureComponent<{}, AppContext> {
	auth: AuthState = {
		isAuth: false,
		switchAuthState: () => {
			this.setState((prevState) => {
				const state = _.cloneDeep(prevState)
				state.auth.isAuth = !state.auth.isAuth
				return state
			})
		},
	}
	i18n: I18n = {
		loadedLang: [startUpLang],
		currentLang: startUpLang,
		supportedLang: availableI18nPackages,
		changeLang: async (lang: string) => {
			console.log(lang)
			let targetLang = lang
			const setState = () => {
				i18n.changeLanguage(targetLang)
				localStorage.setItem(localStorageItems.currentLang, targetLang)

				this.setState((prevState) => {
					const state = _.cloneDeep(prevState)
					state.i18n.currentLang = targetLang
					if (!state.i18n.loadedLang.includes(targetLang))
						state.i18n.loadedLang.push(targetLang)
					return state
				})
			}

			if (!this.state.i18n.supportedLang.includes(targetLang))
				targetLang = this.state.i18n.currentLang
			if (this.state.i18n.loadedLang.includes(targetLang)) {
				setState()
			} else {
				try {
					const data = await import(`i18n/sources/${targetLang}.json`)
					i18n.addResourceBundle(targetLang, 'translation', data, true)
					setState()
				} catch {
					console.log('Error happened while fetching i18n packages')
				}
			}
		},
	}
	entryModule: EntryModule = {
		switchScreenChannel: new Subject<'default' | 'selectLanguage'>(),
	}
	constructor(props: {}) {
		super(props)
		this.state = {
			auth: this.auth,
			i18n: this.i18n,
			entryModule: this.entryModule,
		}
	}

	render() {
		return (
			<RootContext.Provider value={{ ...this.state }}>
				{this.props.children}
			</RootContext.Provider>
		)
	}
}

export { Context, RootContext }
