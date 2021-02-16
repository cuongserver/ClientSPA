import React from 'react'
import { RootContext } from 'context/app-context-dom'
import { Link, RouteComponentProps, Switch, withRouter, matchPath } from 'react-router-dom'
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
	Link as MuiLink,
	List,
} from '@material-ui/core'
import { defaultTheme } from 'constants/default-theme-value'
import { Add, Apps, Close, Lock, NavigateNext, Security } from '@material-ui/icons'
import { mediaMatches } from 'constants/get-media-query'
import { DrawerMenuGroup } from 'components/app-drawer/component.drawer-menu-group'
import { WithTranslation, withTranslation } from 'react-i18next'
import { PrivateRoute } from 'routing/private-route'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { breadcrumbPathnameMap, routes } from 'routing/routes-config'

const styles = {
	drawerWidthExpanded: '250px',
	drawerWidthCollapsed: '50px',
}

type RenderStylesProps = 'collapsedDrawerStyle' | 'expandedDrawerStyle' | 'contentStyle' | 'breadCrumbStyle'

const RoleList = React.lazy(async () => {
	const bundle = await import('modules/role/page.role-list')
	return { default: bundle.RoleList }
})

const RoleAdd = React.lazy(async () => {
	const bundle = await import('modules/role/page.role-add')
	return { default: bundle.RoleAdd }
})

const LoremIpsum = React.lazy(async () => {
	const bundle = await import('dummy/lorem-ipsum')
	return { default: bundle.LoremIpsum }
})

const RoleDetails = React.lazy(async () => {
	const bundle = await import('modules/role/page.role-details')
	return { default: bundle.RoleDetails }
})

const MfaSetup = React.lazy(async () => {
	const bundle = await import('modules/account/page.mfa-setup')
	return { default: bundle.MfaSetup }
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
											history.push(routes.roleList)
										}}
									>
										<ListItemIcon>
											<Security />
										</ListItemIcon>
										<ListItemText
											primary={
												<span
													style={{
														color:
															matchPath(history.location.pathname, { path: routes.roleList, exact: true }) !== null
																? 'red'
																: undefined,
													}}
												>
													{t('main-drawerMenuGroup-membersAndRoles-Roles')}
												</span>
											}
										/>
									</ListItem>
									<ListItem>
										<List>
											<ListItem
												button
												onClick={() => {
													history.push(routes.roleAdd)
												}}
											>
												<ListItemIcon>
													<Add />
												</ListItemIcon>
												<ListItemText
													primary={
														<span
															style={{
																color:
																	matchPath(history.location.pathname, { path: routes.roleAdd, exact: true }) !== null
																		? 'red'
																		: undefined,
															}}
														>
															{t('main-drawerMenuGroup-membersAndRoles-Roles-Add')}
														</span>
													}
												/>
											</ListItem>
										</List>
									</ListItem>
								</DrawerMenuGroup>
								<DrawerMenuGroup groupName={'Account'} groupNameTextVariant="secondary">
									<ListItem
										button
										onClick={() => {
											history.push(routes.setupMfa)
										}}
									>
										<ListItemIcon>
											<Lock />
										</ListItemIcon>
										<ListItemText
											primary={
												<span
													style={{
														color:
															matchPath(history.location.pathname, { path: routes.setupMfa, exact: true }) !== null
																? 'red'
																: undefined,
													}}
												>
													{'setup mfa'}
												</span>
											}
										/>
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
							<div>{this.RenderBreadcrumbs()}</div>
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
									path={routes.roleAdd}
									isAuth={ctx.auth.isAuth}
									render={() => <RoleAdd />}
								/>
								<PrivateRoute
									location={location}
									path={routes.roleDetails}
									isAuth={ctx.auth.isAuth}
									render={() => <RoleDetails />}
								/>
								<PrivateRoute
									location={location}
									exact
									path={routes.setupMfa}
									isAuth={ctx.auth.isAuth}
									render={() => <MfaSetup />}
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
	RenderBreadcrumbs = () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { t, history } = this.props
		const pathnames = history.location.pathname.split('/')
		if (pathnames[1] === '' && pathnames.length === 2) pathnames.pop()
		return (
			<Breadcrumbs separator={<NavigateNext fontSize="small" />}>
				{pathnames.map((path, idx) => {
					const last = idx === pathnames.length - 1
					let to = `${pathnames.slice(0, idx + 1).join('/')}`
					if (to === '' && idx === 0) to = '/'
					if (idx === 0) return null
					return last ? (
						<Typography color="textPrimary" key={to}>
							{breadcrumbPathnameMap[to] !== undefined ? t(breadcrumbPathnameMap[to]) : path}
						</Typography>
					) : (
						<MuiLink color="inherit" onClick={() => history.push(to)} key={to} className="hov-pointer">
							{breadcrumbPathnameMap[to] !== undefined ? t(breadcrumbPathnameMap[to]) : path}
						</MuiLink>
					)
				})}
			</Breadcrumbs>
		)
	}
}
const AddRouter = withRouter(LayoutPortal_Root)
const LayoutPortal = withTranslation(undefined, { withRef: true })(AddRouter)
export { LayoutPortal }
