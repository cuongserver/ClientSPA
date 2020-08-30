
import * as LocaleModel from 'model/store-model/locale'
import * as LoadingScreenModel from 'model/store-model/loading-screen'
import * as AlertModel from 'model/store-model/alert'
import { Action } from 'redux'

export interface AppAction<TPayload> extends Action<string> {
	payload?: TPayload
	error?: boolean
	fromMiddleWare?: boolean
}

export interface AppState {
	locale: LocaleModel.State
	loadingScreen: LoadingScreenModel.State
	alert: AlertModel.State
}

