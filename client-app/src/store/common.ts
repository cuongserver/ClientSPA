import * as LocaleState from 'store/locale/state'
import * as LoaderState from 'store/loader/state'
import * as AlertState from 'store/alert/state'
import * as IdentityState from 'store/identity/state'

export interface AppState {
	locale: LocaleState.State
	loader: LoaderState.State
	alert: AlertState.State
	identity: IdentityState.State

}