import * as React from 'react'
export interface Props {
	children?: React.ReactNode
}

export interface State {}

class Login extends React.PureComponent {
	constructor(props: Props) {
		super(props)

		this.state = {}
	}

	render() {
		return (
			<React.Fragment>
				<div className="no-margin-collapse">
					<p>This is sparta</p>
				</div>
			</React.Fragment>
		)
	}
}

export default Login
