import { AnyAction } from "redux";
export interface StoreStateLoading {
	loading: boolean
}

export interface StoreActionShowLoading extends AnyAction {
	type: 'SHOW_LOADING'
}

export interface StoreActionHideLoading {
	type: 'HIDE_LOADING'
}

export type StoreActionsLoading = StoreActionShowLoading | StoreActionHideLoading