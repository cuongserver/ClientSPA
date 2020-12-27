import {
	createStore,
	combineReducers,
	applyMiddleware,
	compose,
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
const enhancers = [];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const windowIfDefined = typeof window === 'undefined' ? null : window as any;

if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
	enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
}
const store = createStore(
	reducers,
	appStoreInitState,
	compose(applyMiddleware(epicMiddleware), ...enhancers)
)

epicMiddleware.run(combineEpics(localeEpic))
export { store }
