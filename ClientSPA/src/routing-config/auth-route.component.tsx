import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router'

export interface IAuthRouteProps extends RouteProps {
	isAuthenticated: boolean // is authenticate route
	authenticationPath?: string // redirect path if don't authenticate route
}

export class AuthRoute extends Route<IAuthRouteProps> {
	render() {
		if (!this.props.isAuthenticated && this.props.path === '/') {
			return <Route {...this.props} />
		}

		if (this.props.isAuthenticated && this.props.path === '/') {
			return (
				<Route
					{...this.props}
					render={() => (
						<Redirect
							to={{
								pathname: '/login',
							}}
						/>
					)}
				/>
			)
		}

		if (!this.props.isAuthenticated && this.props.path !== '/') {
			const renderComponent = () => (
				<Redirect
					to={{
						pathname: '/',
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
