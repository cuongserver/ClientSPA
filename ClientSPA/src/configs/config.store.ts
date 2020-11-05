import {
	createStore,
	combineReducers,
	applyMiddleware,
	Reducer,
	AnyAction,
} from 'redux'
import { ignoreActions } from 'redux-ignore'
import { reducerAlert } from 'store/reducers/reducer.alert'
import { reducerLoading } from 'store/reducers/reducer.loading'
import { reducerLocale } from 'store/reducers/reducer.locale'
import { reducerIdentity } from 'store/reducers/reducer.identity'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import { StoreStateApp } from 'types/store.app'
import { appStoreInitState } from 'constants/store-init-state'
import { localeEpic } from 'store/epics/epic.locale'
const ignore = (reducer: Reducer) => {
	return ignoreActions(reducer, ['CHANGE_LOCALE__EPIC']) as typeof reducer
}

const reducers = combineReducers({
	alert: ignore(reducerAlert),
	loading: ignore(reducerLoading),
	locale: ignore(reducerLocale),
	identity: ignore(reducerIdentity),
})

const epicMiddleware = createEpicMiddleware<
	AnyAction,
	AnyAction,
	StoreStateApp
>()

const store = createStore(
	reducers,
	appStoreInitState,
	applyMiddleware(epicMiddleware)
)

epicMiddleware.run(combineEpics(localeEpic))
export { store }
