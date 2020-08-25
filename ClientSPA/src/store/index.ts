import { AppState } from 'model/base';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import * as LocaleStore from 'store/locale'
import thunk from 'redux-thunk'


const initialState: AppState = {
	locale: LocaleStore.initialState
}

const reducers = combineReducers({
	locale: LocaleStore.reducer
})

const globalStore = createStore(
	reducers,
	initialState,
	applyMiddleware(thunk)
)

export default globalStore