
import * as LocaleModel from 'store/locale/locale.store.model'
import * as LoadingScreenModel from 'store/loading-screen/loading-screen.store.model'
import { Action } from 'redux'

export interface AppAction<TPayload> extends Action<string> {
	payload?: TPayload
	error?: boolean
	fromMiddleWare?: boolean
}

export interface AppState {
	locale: LocaleModel.State
	loadingScreen: LoadingScreenModel.State
}

