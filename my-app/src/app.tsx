import React from 'react'
import 'app.css'
import { Switch, Route, Redirect } from 'react-router-dom'
import { PrivateRoute } from 'routing/private-route'
import { routes } from 'routing/routes-config'
import { RootContext } from 'context/app-context-dom'

const Login = React.lazy(async () => {
	const bundle = await import('modules/entry/page.login')
	return { default: bundle.Login }
})

const ForgotPassword = React.lazy(async () => {
	const bundle = await import('modules/entry/page.forgot-password')
	return { default: bundle.ForgotPassword }
})

const LayoutDummy = React.lazy(() => import('dummy/dummy'))

class App extends React.PureComponent {
	static contextType = RootContext
	context!: React.ContextType<typeof RootContext>
	render() {
		const ctx = this.context!
		return (
			<div className="sizefull">
				<React.Suspense fallback="">
					<Switch>
						<PrivateRoute
							path={routes.login}
							exact
							isAuth={ctx.auth.isAuth}
							render={() => <Login />}
						></PrivateRoute>
						<PrivateRoute
							path={routes.forgotPassword}
							exact
							isAuth={ctx.auth.isAuth}
							render={() => <ForgotPassword />}
						></PrivateRoute>
						<PrivateRoute
							path={routes.home}
							exact
							isAuth={ctx.auth.isAuth}
							render={() => <LayoutDummy />}
						></PrivateRoute>
						<Route
							path={routes.default}
							component={() => <Redirect to={routes.home} />}
						></Route>
					</Switch>
				</React.Suspense>
			</div>
		)
	}
}

export default App
