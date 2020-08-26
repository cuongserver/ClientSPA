import * as LocaleModel from 'model/locale'
import { Action } from 'redux'

export interface AppAction<TPayload> extends Action<string> {
	payload?: TPayload
	error?: boolean
	fromMiddleWare?: boolean
}

export interface AppState {
	locale: LocaleModel.State
}
