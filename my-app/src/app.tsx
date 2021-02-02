import React from 'react'
import 'app.css'
import { Switch, Route, Redirect } from 'react-router-dom'
import { PrivateRoute } from 'routing/private-route'
import { routes } from 'routing/routes-config'
import { RootContext } from 'context/app-context-dom'

const LayoutDummy = React.lazy(() => import('dummy/dummy'))

const LayoutEntry = React.lazy(async () => {
	const bundle = await import('layouts/layout.entry')
	return { default: bundle.LayoutEntry }
})

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
							path={[routes.login, routes.forgotPassword]}
							exact
							isAuth={ctx.auth.isAuth}
							render={() => <LayoutEntry />}
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
