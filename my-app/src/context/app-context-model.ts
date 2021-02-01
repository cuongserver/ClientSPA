import { Subject } from 'rxjs'

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

interface EntryModule {
	switchScreenChannel: Subject<'default' | 'selectLanguage'>
}

interface AppContext {
	auth: AuthState
	i18n: I18n
	entryModule: EntryModule
}

export type { AuthState, AppContext, I18n, EntryModule }
