import React from 'react'
import { Switch } from 'react-router-dom'
import LoadingScreen from 'component/shared/loading-screen/loading-screen.component'
import Alert from 'component/shared/alert/alert.component'
import 'app.scss'
import 'asset/style/utilities.css'
import { AuthRoute } from 'routing-config/auth-route.component'
import { connect } from 'react-redux'
import { StoreStateApp } from 'types/store.app'

const Login = React.lazy(() => import('component/login/login.component'))
const Main = React.lazy(() => import('component/main/main.component'))

class App extends React.Component<{ isAuthenticated: boolean }> {
	render() {
		return (
			<div className="sizefull">
				<LoadingScreen />
				<Alert />
				<React.Suspense fallback="">
					<Switch>
						<AuthRoute
							path="/login"
							exact
							isAuthenticated={this.props.isAuthenticated}
							authenticationPath="/login"
							render={() => <Login />}
						/>
						<AuthRoute
							path="/"
							isAuthenticated={this.props.isAuthenticated}
							authenticationPath="/login"
							render={() => <Main />}
						/>
					</Switch>
				</React.Suspense>
			</div>
		)
	}
}

const mapStateToProps = (state: StoreStateApp) => ({
	isAuthenticated: state.identity.isAuthenticated,
})

export default connect(mapStateToProps)(App)
