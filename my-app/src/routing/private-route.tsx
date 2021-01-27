import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router'

export interface IAuthRouteProps extends RouteProps {
	isAuth: boolean // is authenticate route
	authenticationPath?: string // redirect path if don't authenticate route
}

class PrivateRoute extends Route<IAuthRouteProps> {
	render() {
		//not authenticated and path is "/login" then do nothing
		if (!this.props.isAuth && this.props.path === '/login') {
			return <Route {...this.props} />
		}

		//already authenticated and path is "/login" then redirect to main
		if (this.props.isAuth && this.props.path === '/login') {
			return (
				<Route
					{...this.props}
					render={() => (
						<Redirect
							to={{
								pathname: '/',
							}}
						/>
					)}
				/>
			)
		}
		//not authenticated and path is not "/login" then redirect to login
		if (!this.props.isAuth && this.props.path !== '/login') {
			const renderComponent = () => (
				<Redirect
					to={{
						pathname: '/login',
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
