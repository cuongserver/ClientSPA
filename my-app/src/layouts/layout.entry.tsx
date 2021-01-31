import React from 'react'
import background from 'assets/images/background/background1.jpg'
import 'assets/styles/layout.entry.scss'
import { RootContext } from 'context/app-context-dom'

class LayoutEntry extends React.PureComponent {
	static contextType = RootContext
	context!: React.ContextType<typeof RootContext>
	render() {
		return (
			<div
				className="sizefull login-container pos-relative"
				style={{
					backgroundImage: `url("${background}")`,
				}}
			>
				{this.props.children}
			</div>
		)
	}
}

export { LayoutEntry }
