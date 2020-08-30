import React from 'react'
import { Route, Switch } from 'react-router-dom'
import LoadingScreen from 'component/shared/loading-screen/loading-screen.component'
import Alert from 'component/shared/alert/alert.component'
import 'app.scss'
import 'asset/style/utilities.css'

const Login = React.lazy(() => import('component/login/login.component'))
const Home = React.lazy(() => import('component/home/home.component'))

class App extends React.Component {
	private logo = `${process.env.PUBLIC_URL}/logo192.png`
	render() {
		return (
			<div className="sizefull">
				<LoadingScreen />
				<Alert />
				<React.Suspense fallback="">
					<Switch>
						<Route path="/" exact render={() => <Login />} />
						<Route path="/login" exact render={() => <Home />} />
					</Switch>
				</React.Suspense>
			</div>
		)
	}
}

export default App
