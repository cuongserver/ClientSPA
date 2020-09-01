import { Dispatch } from 'redux'
/**import 3rd party library */
import { WithTranslation } from 'react-i18next'
import { StaticContext } from 'react-router'

/**import from inside project */
import * as LocaleModel from 'model/store-model/locale'
import { RouteComponentProps } from 'react-router-dom'

export interface IComponentProps
	extends WithTranslation,
		RouteComponentProps<{}, StaticContext, { from: string }> {
	dispatch: Dispatch
	alertOpen: boolean
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
