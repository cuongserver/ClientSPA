import { StoreStateAlert } from 'types/store.alert'
import { StoreStateIdentity } from 'types/store.identity'
import { StoreStateLoading } from 'types/store.loading'
import { StoreStateLocale } from 'types/store.locale'

export interface StoreStateApp {
	alert: StoreStateAlert
	identity: StoreStateIdentity
	loading: StoreStateLoading
	locale: StoreStateLocale
}