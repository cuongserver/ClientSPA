export interface StoreStateLoading {
	loading: boolean
}

export interface StoreActionShowLoading {
	type: 'SHOW_LOADING'
}

export interface StoreActionHideLoading {
	type: 'HIDE_LOADING'
}

export type StoreActionsLoading = StoreActionShowLoading | StoreActionHideLoading