import React from 'react'
import Home from 'component/home/home'
import { Route } from 'react-router-dom'
import Login from 'component/login/login'
import 'app.scss'
import 'asset/style/utilities.css'

class App extends React.Component {
	private logo = `${process.env.PUBLIC_URL}/logo192.png`
	render() {
		return (
			<div className="sizefull">
				<Route path="/" exact component={Login} />
				<Route path="/login" exact component={Home} />
			</div>
		)
	}
}

export default App
