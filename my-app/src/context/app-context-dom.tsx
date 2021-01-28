import React from 'react'
import { AuthState, AppContext } from 'context/app-context-model'
import _ from 'lodash'

const RootContext = React.createContext<AppContext | undefined>(undefined)

class Context extends React.PureComponent<{}, AppContext> {
	auth: AuthState = {
		isAuth: false,
		switchAuthState: () => {
			this.setState((prevState) => {
				const state = _.cloneDeep(prevState)
				state.auth.isAuth = !state.auth.isAuth
				return state
			})
		},
	}
	constructor(props: AppContext) {
		super(props)
		this.state = {
			auth: this.auth,
		}
	}

	render() {
		return (
			<RootContext.Provider value={{ ...this.state }}>
				{this.props.children}
			</RootContext.Provider>
		)
	}
}

export { Context, RootContext }
