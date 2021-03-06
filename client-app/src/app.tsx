import React from 'react'
import { Switch } from 'react-router-dom'
import Loader from 'component/shared/loader/loader.component'
import Alert from 'component/shared/alert/alert.component'
import 'app.scss'
import 'asset/style/utilities.css'
import { AuthRoute } from 'router/auth-route.component'
import { connect } from 'react-redux'
import { AppState } from 'store/common'

const Login = React.lazy(() => import('component/login/login.component'))
const Home = React.lazy(() => import('component/home/home.component'))

class App extends React.Component<{ isAuthenticated: boolean }> {
	private logo = `${process.env.PUBLIC_URL}/logo192.png`
	render() {
		return (
			<div className="sizefull">
				<Loader />
				<Alert />
				<React.Suspense fallback="">
					<Switch>
						<AuthRoute
							path="/"
							exact
							isAuthenticated={this.props.isAuthenticated}
							authenticationPath="/"
							render={() => <Login />}
						/>
						<AuthRoute
							path="/login"
							isAuthenticated={this.props.isAuthenticated}
							authenticationPath="/"
							exact
							render={() => <Home />}
						/>
					</Switch>
				</React.Suspense>
			</div>
		)
	}
}

const mapStateToProps = (state: AppState) => ({
	isAuthenticated: state.identity.isAuthenticated,
})

export default connect(mapStateToProps)(App)
