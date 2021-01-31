interface AuthState {
	isAuth: boolean
	switchAuthState: () => void
}

interface I18n {
	currentLang: string
	loadedLang: string[]
	supportedLang: string[]
	changeLang: (lang: string) => Promise<void>
}

interface AppContext {
	auth: AuthState
	i18n: I18n
}

export type { AuthState, AppContext, I18n }
