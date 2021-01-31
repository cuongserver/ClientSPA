import React from 'react'
import { Link } from 'react-router-dom'
import { RootContext } from 'context/app-context-dom'

class Dummy extends React.PureComponent {
	static contextType = RootContext
	context!: React.ContextType<typeof RootContext>
	render() {
		const ctx = this.context!
		return (
			<div
				style={{
					width: '100%',
					height: '100%',
				}}
			>
				<Link
					onClick={() => ctx.auth.switchAuthState()}
					to="/editor-portal/login"
				>
					To Login
				</Link>
			</div>
		)
	}
}

export default Dummy
