import { AppState, AppAction } from 'store/base'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import * as LocaleStore from 'store/locale/locale.store'
import * as LoadingScreenStore from 'store/loading-screen/loading-screen.store'
import { createEpicMiddleware, combineEpics } from 'redux-observable'

const initialState: AppState = {
	locale: LocaleStore.initialState,
	loadingScreen: LoadingScreenStore.initialState,
}

const reducers = combineReducers({
	locale: LocaleStore.reducer,
	loadingScreen: LoadingScreenStore.reducer,
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
