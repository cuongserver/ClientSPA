import React from 'react'
import { RootContext } from 'context/app-context-dom'
import { Link, RouteComponentProps, Switch, withRouter } from 'react-router-dom'
import {
	AppBar,
	Breadcrumbs,
	CircularProgress,
	Divider,
	Drawer,
	IconButton,
	ListItem,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Typography,
} from '@material-ui/core'
import { defaultTheme } from 'constants/default-theme-value'
import { Apps, Close, NavigateNext, Security } from '@material-ui/icons'
import { mediaMatches } from 'constants/get-media-query'
import { DrawerMenuGroup } from 'components/app-drawer/component.drawer-menu-group'
import { WithTranslation, withTranslation } from 'react-i18next'
import { PrivateRoute } from 'routing/private-route'
import { routes } from 'routing/routes-config'

const styles = {
	drawerWidthExpanded: '250px',
	drawerWidthCollapsed: '50px',
}

type RenderStylesProps = 'collapsedDrawerStyle' | 'expandedDrawerStyle' | 'contentStyle' | 'breadCrumbStyle'

const RoleList = React.lazy(async () => {
	const bundle = await import('modules/role/page.role-list')
	return { default: bundle.RoleList }
})

const LoremIpsum = React.lazy(async () => {
	const bundle = await import('dummy/lorem-ipsum')
	return { default: bundle.LoremIpsum }
})

interface IProps extends RouteComponentProps, WithTranslation {}
interface IState {
	drawerExpand: boolean
}
class LayoutPortal_Root extends React.PureComponent<IProps, IState> {
	static contextType = RootContext
	context!: React.ContextType<typeof RootContext>
	constructor(props: IProps) {
		super(props)
		this.state = {
			drawerExpand: false,
		}
	}

	renderStyles = (): Record<RenderStylesProps, React.CSSProperties> => {
		const ctx = this.context!
		switch (ctx.mediaQuery.match) {
			case mediaMatches.desktop:
				return {
					collapsedDrawerStyle: {
						width: this.state.drawerExpand ? '0px' : styles.drawerWidthCollapsed,
						overflow: this.state.drawerExpand ? 'hidden' : 'unset',
					},
					expandedDrawerStyle: {
						width: this.state.drawerExpand ? styles.drawerWidthExpanded : '0px',
						overflow: this.state.drawerExpand ? 'unset' : 'hidden',
					},
					contentStyle: {
						marginLeft: this.state.drawerExpand ? styles.drawerWidthExpanded : styles.drawerWidthCollapsed,
					},
					breadCrumbStyle: {
						width: '0px',
						overflow: 'hidden',
					},
				}
			case mediaMatches.mobile:
				return {
					collapsedDrawerStyle: {
						width: '0px',
						overflow: 'hidden',
					},
					expandedDrawerStyle: {
						width: this.state.drawerExpand ? '100vw' : '0px',
						overflow: this.state.drawerExpand ? 'unset' : 'hidden',
					},
					contentStyle: {
						marginLeft: '0px',
					},
					breadCrumbStyle: {},
				}
			default:
				console.log('axb')
				return {
					collapsedDrawerStyle: {},
					expandedDrawerStyle: {},
					contentStyle: {},
					breadCrumbStyle: {},
				}
		}
	}

	render() {
		const { t, location, history } = this.props
		const ctx = this.context!
		return (
			<div>
				<AppBar style={{ zIndex: defaultTheme.zIndex!.drawer! + 1 }}>
					<Toolbar>
						<Link onClick={() => ctx.auth.setToken('')} to="/editor-portal/login">
							To Login
						</Link>
					</Toolbar>
				</AppBar>
				<Drawer
					variant="persistent"
					open={true}
					PaperProps={{
						variant: 'elevation',
						style: {
							width: 'auto',
						},
					}}
				>
					<Toolbar disableGutters></Toolbar>
					<div className="flex-row">
						<div style={this.renderStyles().collapsedDrawerStyle}>
							<IconButton onClick={() => this.setState({ drawerExpand: true })}>
								<Apps />
							</IconButton>
						</div>
						<div style={this.renderStyles().expandedDrawerStyle}>
							<div className="flex-row">
								<div className="m-r-auto"></div>
								<IconButton onClick={() => this.setState({ drawerExpand: false })}>
									<Close />
								</IconButton>
							</div>
							<Divider />
							<div className="of-auto">
								<DrawerMenuGroup groupName={t('main-drawerMenuGroup-membersAndRoles')} groupNameTextVariant="secondary">
									<ListItem
										button
										onClick={() => {
											console.log('xxx')
											history.push(routes.roleList)
										}}
									>
										<ListItemIcon>
											<Security />
										</ListItemIcon>
										<ListItemText primary={t('main-drawerMenuGroup-membersAndRoles-Roles')} />
									</ListItem>
								</DrawerMenuGroup>
							</div>
						</div>
					</div>
				</Drawer>
				<div>
					<Toolbar />
					<div style={this.renderStyles().contentStyle}>
						<div className="flex-m">
							<div style={this.renderStyles().breadCrumbStyle}>
								<IconButton onClick={() => this.setState({ drawerExpand: true })}>
									<Apps />
								</IconButton>
							</div>
							<Divider orientation="vertical" flexItem />
							<div>
								<Breadcrumbs separator={<NavigateNext fontSize="small" />}>
									<Typography>xxx</Typography>
									<Typography>yyy</Typography>
									<Typography>zzz</Typography>
								</Breadcrumbs>
							</div>
						</div>
						<Divider />

						<Switch>
							<React.Suspense
								fallback={
									<div>
										<CircularProgress />
									</div>
								}
							>
								<PrivateRoute
									location={location}
									exact
									path={routes.roleList}
									isAuth={ctx.auth.isAuth}
									render={() => <RoleList />}
								/>
								<PrivateRoute
									location={location}
									exact
									path={routes.home}
									isAuth={ctx.auth.isAuth}
									render={() => <LoremIpsum />}
								/>
							</React.Suspense>
						</Switch>
					</div>
				</div>
			</div>
		)
	}
}
const AddRouter = withRouter(LayoutPortal_Root)
const LayoutPortal = withTranslation(undefined, { withRef: true })(AddRouter)
export { LayoutPortal }
