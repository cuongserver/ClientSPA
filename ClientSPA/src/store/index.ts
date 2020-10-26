import { AppState, AppAction } from 'model/store-model'
import { createStore, combineReducers, applyMiddleware, Reducer } from 'redux'
import * as LocaleStore from 'store/locale'
import * as LoadingScreenStore from 'store/loading-screen'
import * as AlertStore from 'store/alert'
import * as IdentityStore from 'store/identity'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import { ignoreActions } from 'redux-ignore'

const initialState: AppState = {
	locale: LocaleStore.initialState,
	loadingScreen: LoadingScreenStore.initialState,
	alert: AlertStore.initialState,
	identity: IdentityStore.initialState,
}

const ignore = (reducer: Reducer) => {
	return ignoreActions(reducer, ['CHANGE_LANGUAGE_BEFORE']) as typeof reducer
}

const reducers = combineReducers({
	locale: ignore(LocaleStore.reducer),
	loadingScreen: ignore(LoadingScreenStore.reducer),
	alert: ignore(AlertStore.reducer),
	identity: ignore(IdentityStore.reducer),
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
