import React from 'react'
import Home from 'Components/Home/Home'
import { Route } from 'react-router-dom'
import Login from 'Components/Login/Login'

class App extends React.Component {
	private logo = `${process.env.PUBLIC_URL}/logo192.png`
	render() {
		return (
			<React.Fragment>
				<Route path="/" exact component={Home} />
				<Route path="/login" exact component={Login} />
			</React.Fragment>
		)
	}
}

export default App
