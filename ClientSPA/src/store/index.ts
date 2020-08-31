import { AppState, AppAction } from 'model/store-model'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import * as LocaleStore from 'store/locale'
import * as LoadingScreenStore from 'store/loading-screen'
import * as AlertStore from 'store/alert'
import * as IdentityStore from 'store/identity'
import { createEpicMiddleware, combineEpics } from 'redux-observable'

const initialState: AppState = {
	locale: LocaleStore.initialState,
	loadingScreen: LoadingScreenStore.initialState,
	alert: AlertStore.initialState,
	identity: IdentityStore.initialState,
}

const reducers = combineReducers({
	locale: LocaleStore.reducer,
	loadingScreen: LoadingScreenStore.reducer,
	alert: AlertStore.reducer,
	identity: IdentityStore.reducer,
})

const epicMiddleware = createEpicMiddleware<
	AppAction<string>,
	AppAction<string>,
	AppState
>()

const globalStore = createStore(
	reducers,
	initialState,
	applyMiddleware(epicMiddleware)
)

epicMiddleware.run(combineEpics(LocaleStore.localeEpic))

export default globalStore
