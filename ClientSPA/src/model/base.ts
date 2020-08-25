import * as LocaleModel from 'model/locale'



export interface PureAction<TPayload> {
	type: string
	payload?: TPayload
	error?: boolean
}



export interface AppState {
	locale: LocaleModel.State
}

export interface AppThunkAction<TAction> {
	(dispatch: (action: TAction) => void, getState: () => AppState): void;
}