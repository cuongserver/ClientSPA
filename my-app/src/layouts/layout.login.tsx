import React from 'react'
import background from 'assets/images/background/background1.jpg'
import 'layouts/layout.login.scss'
class LayoutLogin extends React.PureComponent {
	render() {
		return (
			<div
				className="sizefull login-container"
				style={{
					backgroundImage: `url("${background}")`,
				}}
			></div>
		)
	}
}

export default LayoutLogin
