
export interface State {
	open: boolean
	severity: 'error' | 'success' | 'warning' | 'info'
	message?: string
}

export const initialState: State = {
	open: false,
	severity: 'info'
}