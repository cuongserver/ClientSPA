import React from 'react'
import { AuthState, AppContext, I18n, EntryModule, InitProgress, MediaQuery } from 'context/app-context-model'
import _ from 'lodash'
import { availableI18nPackages, startUpLang, i18n } from 'i18n/i18n-config'
import { localStorageItems } from 'constants/local-storage-items'
import { Subject } from 'rxjs'
import jwtDecode from 'jwt-decode'
import { CircularProgress } from '@material-ui/core'
import { UserApiHandler } from 'http/api-handlers/user-api-handler'
import { mediaMatches } from 'constants/get-media-query'

const RootContext = React.createContext<AppContext | undefined>(undefined)

const getJwt = () => {
	const jwt = localStorage.getItem(localStorageItems.jwt)
	if (jwt === null) return ''
	try {
		jwtDecode(jwt)
		return jwt
	} catch {
		return ''
	}
}

class Context extends React.PureComponent<{}, AppContext> {
	auth: AuthState = {
		isAuth: false,
		switchAuthState: (status: boolean) => {
			this.setState((prevState) => {
				const state = _.cloneDeep(prevState)
				state.auth.isAuth = status
				return state
			})
		},
		jwToken: getJwt(),
		setToken: (token: string) => {
			localStorage.setItem(localStorageItems.jwt, token)
			this.setState(
				(prevState) => {
					const state = _.cloneDeep(prevState)
					state.auth.jwToken = token
					return state
				},
				() => {
					if (token.length > 0) {
						this.auth.switchAuthState(true)
					} else {
						this.auth.switchAuthState(false)
						localStorage.removeItem(localStorageItems.jwt)
					}
				}
			)
		},
	}
	i18n: I18n = {
		loadedLang: [startUpLang],
		currentLang: startUpLang,
		supportedLang: availableI18nPackages,
		changeLang: async (lang: string) => {
			let targetLang = lang
			const setState = () => {
				i18n.changeLanguage(targetLang)
				localStorage.setItem(localStorageItems.currentLang, targetLang)

				this.setState((prevState) => {
					const state = _.cloneDeep(prevState)
					state.i18n.currentLang = targetLang
					if (!state.i18n.loadedLang.includes(targetLang)) state.i18n.loadedLang.push(targetLang)
					return state
				})
			}

			if (!this.state.i18n.supportedLang.includes(targetLang)) targetLang = this.state.i18n.currentLang
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

	initProgress: InitProgress = {
		ready: false,
		switchReadyState: (status: boolean) => {
			this.setState((prevState) => {
				const state = _.cloneDeep(prevState)
				state.initProgress.ready = status
				return state
			})
		},
	}

	mediaQuery: MediaQuery = {
		match: '',
		setMatch: (media: string) => {
			this.setState((prevState) => {
				const state = _.cloneDeep(prevState)
				state.mediaQuery.match = media
				return state
			})
		},
	}

	constructor(props: {}) {
		super(props)
		this.state = {
			auth: this.auth,
			i18n: this.i18n,
			entryModule: this.entryModule,
			initProgress: this.initProgress,
			mediaQuery: this.mediaQuery,
		}
	}

	componentDidMount() {
		this.state.mediaQuery.setMatch(mediaMatches.getMediaMatches())
		window.addEventListener('resize', () => {
			const media = mediaMatches.getMediaMatches()
			if (media !== this.state.mediaQuery.match) this.state.mediaQuery.setMatch(media)
		})
		const userApiHandlers = new UserApiHandler()
		if (this.state.auth.jwToken === '') {
			this.initProgress.switchReadyState(true)
			return
		}
		userApiHandlers
			.setHeader({ Authorization: this.state.auth.jwToken })
			.restoreSession()
			.subscribe({
				next: (res) => {
					if (res.result === 'auth-success') {
						this.auth.setToken(res.jwToken)
						this.initProgress.switchReadyState(true)
					}
					if (res.result === 'auth-failed') {
						this.auth.setToken('')
						this.initProgress.switchReadyState(true)
					}
				},
			})
	}

	render() {
		return (
			<RootContext.Provider value={{ ...this.state }}>
				{this.state.initProgress.ready ? (
					this.props.children
				) : (
					<div>
						<CircularProgress />
					</div>
				)}
			</RootContext.Provider>
		)
	}
}

export { Context, RootContext }
