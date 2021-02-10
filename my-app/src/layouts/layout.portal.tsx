import React from 'react'
import { RootContext } from 'context/app-context-dom'
//import { PrivateRoute } from 'routing/private-route'
//import { routes } from 'routing/routes-config'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { AppBar, Breadcrumbs, Divider, Drawer, IconButton, Toolbar, Typography } from '@material-ui/core'
import { defaultTheme } from 'constants/default-theme-value'
import { Apps, Close, NavigateNext } from '@material-ui/icons'
import { mediaMatches } from 'constants/get-media-query'

const styles = {
	drawerWidthExpanded: '250px',
	drawerWidthCollapsed: '50px',
}

type RenderStylesProps = 'collapsedDrawerStyle' | 'expandedDrawerStyle' | 'contentStyle' | 'breadCrumbStyle'

interface IProps extends RouteComponentProps {}
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
		return (
			<div>
				<AppBar style={{ zIndex: defaultTheme.zIndex!.drawer! + 1 }}>
					<Toolbar></Toolbar>
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
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse mollis urna velit, et fringilla urna
						aliquam vitae. Donec eu ligula lorem. Nulla quis bibendum nibh, ullamcorper finibus elit. Maecenas in nunc
						nec mauris fermentum consectetur. Vestibulum pretium nisl felis, quis finibus est pulvinar a. Nullam
						sagittis at sem eget vulputate. Curabitur velit tortor, sollicitudin non sollicitudin at, volutpat non nibh.
						Integer pretium suscipit risus, nec vehicula ipsum ullamcorper vitae. Aliquam fermentum hendrerit orci, nec
						aliquet diam imperdiet a. Curabitur a facilisis ipsum. Mauris sollicitudin facilisis libero quis pretium.
						Proin porttitor libero nec sapien faucibus euismod. Nam nec convallis tortor. Pellentesque elementum mi at
						ipsum cursus aliquam eu ut ante. In eu nisl a massa tempor interdum eget quis elit. Proin molestie sem eu
						fringilla efficitur. Ut euismod est sed odio malesuada, eget elementum arcu tincidunt. Morbi ac nulla sed
						lacus blandit tincidunt placerat nec diam. Nam eu nisl convallis lectus pulvinar sagittis sit amet id neque.
						Praesent id volutpat libero. Fusce quis lectus quis nisl elementum suscipit. Phasellus imperdiet fermentum
						lorem vulputate feugiat. Nunc lobortis justo mi. Pellentesque euismod suscipit odio, eget convallis ante
						fermentum sed. Maecenas nulla libero, consectetur tristique vestibulum a, consequat sed ante. Cras
						scelerisque, turpis nec maximus varius, velit nisl pharetra est, vitae laoreet quam purus nec mi. Nullam
						porttitor justo vitae orci semper pellentesque. Vestibulum euismod finibus ullamcorper. Vestibulum blandit
						ac urna et egestas. Pellentesque velit elit, laoreet quis sollicitudin sit amet, tempus sit amet ante. Etiam
						sed arcu semper, posuere mi ut, viverra risus. Etiam at facilisis ligula. Donec hendrerit dui nec odio
						finibus, nec iaculis risus placerat. Etiam euismod pharetra nunc, ut fringilla nulla varius et. Suspendisse
						arcu mi, porta vel elit non, egestas hendrerit velit. Donec finibus ipsum nibh, vitae porttitor arcu luctus
						sit amet. Sed sed commodo mauris, id ullamcorper tortor. Etiam sodales placerat sollicitudin. Etiam mauris
						libero, imperdiet nec feugiat non, tempor eget quam. Vestibulum sit amet tincidunt metus. Etiam ultricies ac
						quam eget condimentum. Praesent euismod elit massa, vitae malesuada ligula tincidunt sollicitudin. Nulla eu
						lacus nibh. Suspendisse porta tortor non mi gravida, non varius nisi rhoncus. Suspendisse non aliquet leo.
						Suspendisse ac felis sed lorem mollis accumsan et vel diam. Proin est justo, semper vel nulla a, tristique
						iaculis est. Fusce pharetra bibendum dapibus. Aliquam convallis ligula sed consectetur ullamcorper. Ut
						euismod porttitor enim nec mollis. Vestibulum vel quam tellus. Curabitur finibus ac ligula euismod ultrices.
						Proin ultricies eros nisl, congue faucibus velit sodales ut. Lorem ipsum dolor sit amet, consectetur
						adipiscing elit. Suspendisse mollis urna velit, et fringilla urna aliquam vitae. Donec eu ligula lorem.
						Nulla quis bibendum nibh, ullamcorper finibus elit. Maecenas in nunc nec mauris fermentum consectetur.
						Vestibulum pretium nisl felis, quis finibus est pulvinar a. Nullam sagittis at sem eget vulputate. Curabitur
						velit tortor, sollicitudin non sollicitudin at, volutpat non nibh. Integer pretium suscipit risus, nec
						vehicula ipsum ullamcorper vitae. Aliquam fermentum hendrerit orci, nec aliquet diam imperdiet a. Curabitur
						a facilisis ipsum. Mauris sollicitudin facilisis libero quis pretium. Proin porttitor libero nec sapien
						faucibus euismod. Nam nec convallis tortor. Pellentesque elementum mi at ipsum cursus aliquam eu ut ante. In
						eu nisl a massa tempor interdum eget quis elit. Proin molestie sem eu fringilla efficitur. Ut euismod est
						sed odio malesuada, eget elementum arcu tincidunt. Morbi ac nulla sed lacus blandit tincidunt placerat nec
						diam. Nam eu nisl convallis lectus pulvinar sagittis sit amet id neque. Praesent id volutpat libero. Fusce
						quis lectus quis nisl elementum suscipit. Phasellus imperdiet fermentum lorem vulputate feugiat. Nunc
						lobortis justo mi. Pellentesque euismod suscipit odio, eget convallis ante fermentum sed. Maecenas nulla
						libero, consectetur tristique vestibulum a, consequat sed ante. Cras scelerisque, turpis nec maximus varius,
						velit nisl pharetra est, vitae laoreet quam purus nec mi. Nullam porttitor justo vitae orci semper
						pellentesque. Vestibulum euismod finibus ullamcorper. Vestibulum blandit ac urna et egestas. Pellentesque
						velit elit, laoreet quis sollicitudin sit amet, tempus sit amet ante. Etiam sed arcu semper, posuere mi ut,
						viverra risus. Etiam at facilisis ligula. Donec hendrerit dui nec odio finibus, nec iaculis risus placerat.
						Etiam euismod pharetra nunc, ut fringilla nulla varius et. Suspendisse arcu mi, porta vel elit non, egestas
						hendrerit velit. Donec finibus ipsum nibh, vitae porttitor arcu luctus sit amet. Sed sed commodo mauris, id
						ullamcorper tortor. Etiam sodales placerat sollicitudin. Etiam mauris libero, imperdiet nec feugiat non,
						tempor eget quam. Vestibulum sit amet tincidunt metus. Etiam ultricies ac quam eget condimentum. Praesent
						euismod elit massa, vitae malesuada ligula tincidunt sollicitudin. Nulla eu lacus nibh. Suspendisse porta
						tortor non mi gravida, non varius nisi rhoncus. Suspendisse non aliquet leo. Suspendisse ac felis sed lorem
						mollis accumsan et vel diam. Proin est justo, semper vel nulla a, tristique iaculis est. Fusce pharetra
						bibendum dapibus. Aliquam convallis ligula sed consectetur ullamcorper. Ut euismod porttitor enim nec
						mollis. Vestibulum vel quam tellus. Curabitur finibus ac ligula euismod ultrices. Proin ultricies eros nisl,
						congue faucibus velit sodales ut.
					</div>
				</div>
			</div>
		)
	}
}

const LayoutPortal = withRouter(LayoutPortal_Root)
export { LayoutPortal }
