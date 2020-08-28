/* eslint-disable @typescript-eslint/no-explicit-any */
import * as LocaleModel from 'model/locale'
import * as LoadingScreenModel from 'model/loading-screen'
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

export interface GeneralModel {
	[key: string]: any
}
