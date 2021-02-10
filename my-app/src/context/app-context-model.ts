import { Subject } from 'rxjs'

interface AuthState {
	isAuth: boolean
	switchAuthState: (status: boolean) => void
	jwToken: string
	setToken: (token: string) => void
}

interface I18n {
	currentLang: string
	loadedLang: string[]
	supportedLang: string[]
	changeLang: (lang: string) => Promise<void>
}

interface InitProgress {
	ready: boolean
	switchReadyState: (status: boolean) => void
}

interface EntryModule {
	switchScreenChannel: Subject<'default' | 'selectLanguage'>
}

interface MediaQuery {
	match: string
	setMatch: (media: string) => void
}

interface AppContext {
	auth: AuthState
	i18n: I18n
	entryModule: EntryModule
	initProgress: InitProgress
	mediaQuery: MediaQuery
}

export type { AuthState, AppContext, I18n, EntryModule, InitProgress, MediaQuery }
