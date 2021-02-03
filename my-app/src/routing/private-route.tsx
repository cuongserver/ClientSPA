import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router'
import { routes } from 'routing/routes-config'

export interface IAuthRouteProps extends RouteProps {
	isAuth: boolean // is authenticate route
	authenticationPath?: string // redirect path if don't authenticate route
}

class PrivateRoute extends Route<IAuthRouteProps> {
	publicRoutes: string[] = [routes.login, routes.forgotPassword]
	render() {
		//not authenticated and path is "/login" then do nothing
		if (!this.props.isAuth && this.publicRoutes.includes(this.props.location?.pathname as string)) {
			return <Route {...this.props} />
		}

		//already authenticated and path is "/login" then redirect to main
		if (this.props.isAuth && (this.props.location?.pathname as string) === routes.login) {
			return (
				<Route
					{...this.props}
					render={() => (
						<Redirect
							to={{
								pathname: routes.home,
							}}
						/>
					)}
				/>
			)
		}
		//not authenticated and path is not public then redirect to login
		if (!this.props.isAuth && !this.publicRoutes.includes(this.props.location?.pathname as string)) {
			const renderComponent = () => (
				<Redirect
					to={{
						pathname: routes.login,
						state: {
							from: this.props.path,
						},
					}}
				/>
			)

			return <Route {...this.props} render={renderComponent} />
		} else {
			return <Route {...this.props} />
		}
	}
}

export { PrivateRoute }
