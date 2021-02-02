import React from 'react'
import background from 'assets/images/background/background1.jpg'
import 'assets/styles/layout.entry.scss'
import { RootContext } from 'context/app-context-dom'
import { PrivateRoute } from 'routing/private-route'
import { routes } from 'routing/routes-config'
import { RouteComponentProps, withRouter } from 'react-router-dom'

const Login = React.lazy(async () => {
	const bundle = await import('modules/entry/page.login')
	return { default: bundle.Login }
})

const ForgotPassword = React.lazy(async () => {
	const bundle = await import('modules/entry/page.forgot-password')
	return { default: bundle.ForgotPassword }
})

interface IProps extends RouteComponentProps {}

class LayoutEntry_Root extends React.PureComponent<IProps> {
	static contextType = RootContext
	context!: React.ContextType<typeof RootContext>
	render() {
		const ctx = this.context!
		const { location } = this.props
		return (
			<div
				className="sizefull login-container pos-relative"
				style={{
					backgroundImage: `url("${background}")`,
				}}
			>
				<React.Suspense fallback="">
					<PrivateRoute
						location={location}
						path={routes.login}
						exact
						isAuth={ctx.auth.isAuth}
						render={() => <Login />}
					></PrivateRoute>
					<PrivateRoute
						location={location}
						path={routes.forgotPassword}
						exact
						isAuth={ctx.auth.isAuth}
						render={() => <ForgotPassword />}
					></PrivateRoute>
				</React.Suspense>
			</div>
		)
	}
}

const LayoutEntry = withRouter(LayoutEntry_Root)
export { LayoutEntry }
