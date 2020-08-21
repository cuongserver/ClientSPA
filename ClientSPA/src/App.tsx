import React from 'react'
import Home from 'component/home/home'
import { Route } from 'react-router-dom'
import Login from 'component/login/login'
import { Container } from '@material-ui/core'
import 'app.scss'

class App extends React.Component {
	private logo = `${process.env.PUBLIC_URL}/logo192.png`
	render() {
		return (
			<Container>
				<Route path="/" exact component={Login} />
				<Route path="/login" exact component={Home} />
			</Container>
		)
	}
}

export default App
