import { createStore, combineReducers, applyMiddleware, Reducer } from 'redux'
import { ignoreActions } from 'redux-ignore'
import { createEpicMiddleware, combineEpics } from 'redux-observable'

import { AppState } from 'store/common'
import * as LocaleState from 'store/locale/state'
import * as LoaderState from 'store/loader/state'
import * as AlertState from 'store/alert/state'
import * as IdentityState from 'store/identity/state'

import * as LocaleReducer from 'store/locale/reducer'
import * as LoaderReducer from 'store/loader/reducer'
import * as AlertReducer from 'store/alert/reducer'
import * as IdentityReducer from 'store/identity/reducer'

import * as LocaleActions from 'store/locale/actions'

import * as LocaleEpics from 'store/locale/epics'

const initialState: AppState = {
	locale: LocaleState.initialState,
	loader: LoaderState.initialState,
	alert: AlertState.initialState,
	identity: IdentityState.initialState,
}

const ignore = (reducer: Reducer) => {
	return ignoreActions(reducer, ['CHANGE_LANGUAGE_MIDDLEWARE']) as typeof reducer
}



const reducers = combineReducers({
	locale: ignore(LocaleReducer.reducer),
	loader: ignore(LoaderReducer.reducer),
	alert: ignore(AlertReducer.reducer),
	identity: ignore(IdentityReducer.reducer),
})

const epicMiddleware = createEpicMiddleware<
	LocaleActions.KnownAction,
	LocaleActions.KnownAction,
	AppState
>()

const store = createStore(
	reducers,
	initialState,
	applyMiddleware(epicMiddleware)
)

epicMiddleware.run(combineEpics(LocaleEpics.epics))

export default store