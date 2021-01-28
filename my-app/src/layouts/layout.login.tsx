import React from 'react'
import background from 'assets/images/background/background1.jpg'
import 'layouts/layout.login.scss'
import { RootContext } from 'context/app-context-dom'

class LayoutLogin extends React.PureComponent {
	static contextType = RootContext
	context!: React.ContextType<typeof RootContext>
	render() {
		const ctx = this.context!
		return (
			<div
				className="sizefull login-container"
				style={{
					backgroundImage: `url("${background}")`,
				}}
			>
				{ctx.auth.isAuth.toString()}
				<button
					onClick={() => {
						ctx.auth.switchAuthState()
					}}
				>
					change
				</button>
			</div>
		)
	}
}

export default LayoutLogin
