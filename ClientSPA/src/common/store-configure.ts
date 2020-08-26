import { AppState, AppAction } from 'model/base'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import * as LocaleStore from 'store/locale'
import { createEpicMiddleware, combineEpics } from 'redux-observable'

const initialState: AppState = {
	locale: LocaleStore.initialState,
}

const reducers = combineReducers({
	locale: LocaleStore.reducer,
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
