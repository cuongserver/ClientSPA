import React from 'react'
import 'app.css'

class Home extends React.Component {
	private logo = `${process.env.PUBLIC_URL}/logo192.png`
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={this.logo} className="App-logo" alt="logo" />
					<p>
						Edit <code>src/App.tsx</code> and save to reload.
					</p>
					<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
						Learn React
					</a>
				</header>
			</div>
		)
	}
}

export default Home
