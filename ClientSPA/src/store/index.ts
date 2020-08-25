import { createStore } from 'redux'
import * as LocaleStore from 'store/locale'

const globalStore = createStore(
	LocaleStore.reducer,
	LocaleStore.initialState
)

export default globalStore