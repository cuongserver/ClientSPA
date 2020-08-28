/**import 3rd party library */
import { WithTranslation } from 'react-i18next'
/**import from inside project */
import * as LocaleModel from 'store/locale/locale.store.model'

export interface IComponentProps extends WithTranslation, LocaleModel.State {
	changeLanguage: (lang: string) => void
	activateLoader: (state: boolean) => void
}

export interface IComponentState {
	mode: string
	showPassword: boolean
}

export interface ILogin {
	username: string
	password: string
}

export interface IRecoverPassword {
	usernameForPasswordRecovery: string
}
