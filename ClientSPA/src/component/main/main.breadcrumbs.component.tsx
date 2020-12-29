import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { StaticContext, withRouter } from 'react-router'
import { Breadcrumbs, Typography, Link, Card } from '@material-ui/core'
import { NavigateNext } from '@material-ui/icons'
import { withTranslation, WithTranslation } from 'react-i18next'
import { breadcrumbNameMap } from 'configs/config.routes'

interface MainBreadcrumbsProps
	extends WithTranslation,
		RouteComponentProps<{}>,
		StaticContext {}

class MainBreadcrumbsOrigin extends React.PureComponent<
	MainBreadcrumbsProps,
	{}
> {
	render() {
		const { history } = this.props
		const pathnames = history.location.pathname.split('/')
		if (pathnames[1] === '' && pathnames.length === 2) pathnames.pop()
		return (
			<Card raised={false} className="p-t-3 p-b-3 p-l-10 p-r-10">
				<Breadcrumbs separator={<NavigateNext fontSize="small" />}>
					{pathnames.map((path, idx) => {
						const last = idx === pathnames.length - 1
						let to = `${pathnames.slice(0, idx + 1).join('/')}`
						if (to === '' && idx === 0) to = '/'
						return last ? (
							<Typography color="textPrimary" key={to}>
								{this.props.t(breadcrumbNameMap[to])}
							</Typography>
						) : (
							<Link
								color="inherit"
								onClick={() => history.push(to)}
								key={to}
								className="hov-pointer"
							>
								{this.props.t(breadcrumbNameMap[to])}
							</Link>
						)
					})}
				</Breadcrumbs>
			</Card>
		)
	}
}
const AddTranslation = withTranslation(undefined, { withRef: true })(
	MainBreadcrumbsOrigin
)
const MainBreadcrumbs = withRouter(AddTranslation)

export { MainBreadcrumbs }
