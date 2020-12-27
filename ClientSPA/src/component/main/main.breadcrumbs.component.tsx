import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { StaticContext, withRouter } from 'react-router'
import { Breadcrumbs, Typography, Link } from '@material-ui/core'
import { NavigateNext } from '@material-ui/icons'
const breadcrumbNameMap: { [key: string]: string } = {
	'/': 'Home',
	'/home': 'Editor',
}

interface MainBreadcrumbsProps extends RouteComponentProps<{}>, StaticContext {}

class MainBreadcrumbsOrigin extends React.PureComponent<MainBreadcrumbsProps> {
	render() {
		const { history } = this.props
		const pathnames = history.location.pathname.split('/')
		if (pathnames[1] === '' && pathnames.length === 2) pathnames.pop()
		return (
			<Breadcrumbs separator={<NavigateNext fontSize="small" />}>
				{pathnames.map((path, idx) => {
					const last = idx === pathnames.length - 1
					let to = `${pathnames.slice(0, idx + 1).join('/')}`
					if (to === '' && idx === 0) to = '/'
					return last ? (
						<Typography color="inherit" key={to}>
							{breadcrumbNameMap[to]}
						</Typography>
					) : (
						<Link
							color="inherit"
							onClick={() => history.push(to)}
							key={to}
							className="hov-pointer"
						>
							{breadcrumbNameMap[to]}
						</Link>
					)
				})}
			</Breadcrumbs>
		)
	}
}

const MainBreadcrumbs = withRouter(MainBreadcrumbsOrigin)

export { MainBreadcrumbs }
