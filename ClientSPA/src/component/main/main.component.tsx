import React from 'react'
import {
	AppBar,
	Toolbar,
	Typography,
	Drawer,
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider,
	IconButton,
} from '@material-ui/core'
import {
	Image,
	Menu,
	Clear,
	BrightnessHigh,
	Brightness4,
} from '@material-ui/icons'
import { DrawerMenuGroup } from 'component/main/main.drawer.menugroup.component'
import { withTranslation, WithTranslation } from 'react-i18next'
import {
	createStyles,
	Theme,
	withStyles,
	WithStyles,
	WithTheme,
	withTheme,
} from '@material-ui/core/styles'
import { RootContext } from 'context/context.app'

const drawerWidth = 240
const cssClasses = (theme: Theme) => {
	return createStyles({
		root: {
			display: 'flex',
		},
		appBar: {
			zIndex: theme.zIndex.drawer + 1,
		},
		drawerPaper: {
			width: drawerWidth,
		},
		content: {
			flexGrow: 1,
			transition: theme.transitions.create('margin-left', {
				easing: 'linear',
				duration: theme.transitions.duration.leavingScreen,
			}),
		},
		contentShift: {
			marginLeft: drawerWidth,
			transition: theme.transitions.create('margin-left', {
				easing: 'linear',
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		toolBarHeight: {
			...theme.mixins.toolbar,
		},
	})
}

interface MainProps
	extends WithTranslation,
		WithStyles<typeof cssClasses>,
		WithTheme {}

interface MainState {
	drawerOpen: boolean
}
class UIComponent extends React.PureComponent<MainProps, MainState> {
	static contextType = RootContext
	context!: React.ContextType<typeof RootContext>
	constructor(props: MainProps) {
		super(props)
		this.state = {
			drawerOpen: false,
		}
	}

	toggleDrawer = () => {
		this.setState({
			drawerOpen: !this.state.drawerOpen,
		})
	}

	setTheme = () => {
		if (this.context?.theme.value === 'dark')
			this.context?.theme.setTheme('light')
		if (this.context?.theme.value === 'light')
			this.context?.theme.setTheme('dark')
	}

	render() {
		const { classes, theme } = this.props
		const ctx = this.context!
		return (
			<div className="dis-flex sizefull">
				<AppBar
					position="fixed"
					classes={{ root: classes.appBar }}
					color="primary"
				>
					<Toolbar disableGutters={true}>
						<IconButton
							onClick={this.toggleDrawer}
							color="inherit"
							style={
								this.state.drawerOpen
									? {
											zIndex: -1,
											opacity: 0,
									  }
									: undefined
							}
						>
							<Menu />
						</IconButton>
						<Typography variant="h6" noWrap>
							Clipped drawer
						</Typography>
						<div className="m-l-auto m-r-5">
							<IconButton onClick={this.setTheme} color="inherit">
								{ctx.theme.value === 'dark' && <BrightnessHigh />}
								{ctx.theme.value === 'light' && <Brightness4 />}
							</IconButton>
						</div>
					</Toolbar>
				</AppBar>

				<Drawer
					variant="persistent"
					open={this.state.drawerOpen}
					PaperProps={{
						variant: 'elevation',
						className: 'elevation-drawer',
						classes: { root: classes.drawerPaper },
					}}
				>
					<Toolbar />
					<div className="dis-flex">
						<div className="m-l-auto m-t-5">
							<IconButton size="small" onClick={this.toggleDrawer}>
								<Clear />
							</IconButton>
						</div>
					</div>
					<div>
						<Divider />
						<DrawerMenuGroup
							groupName={this.props.t('main-drawer-menugroup-content')}
							groupNameTextVariant="secondary"
						>
							<ListItem button>
								<ListItemIcon>
									<Image />
								</ListItemIcon>
								<ListItemText
									primary={this.props.t('main-drawer-menugroup-item-image')}
								/>
							</ListItem>
						</DrawerMenuGroup>
					</div>
				</Drawer>
				<div
					className={`w-full min-h-full ${
						this.state.drawerOpen ? classes.contentShift : classes.content
					} ${classes.content}`}
					style={{
						background:
							ctx.theme.value === 'dark'
								? theme.palette.background.paper
								: theme.palette.background.default,
					}}
				>
					<div className={classes.toolBarHeight} />
					<Typography paragraph className="break-word p-l-3 p-r-3">
						{JSON.stringify(theme)}
					</Typography>
					<Typography paragraph className="break-word p-l-3 p-r-3">
						{ctx.theme.value}
					</Typography>
					<Typography paragraph className="break-word p-l-3 p-r-3">
						Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
						ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
						elementum integer enim neque volutpat ac tincidunt. Ornare
						suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
						volutpat consequat mauris. Elementum eu facilisis sed odio morbi.
						Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt
						ornare massa eget egestas purus viverra accumsan in. In hendrerit
						gravida rutrum quisque non tellus orci ac. Pellentesque nec nam
						aliquam sem et tortor. Habitant morbi tristique senectus et.
						Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean
						euismod elementum nisi quis eleifend. Commodo viverra maecenas
						accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam
						ultrices sagittis orci a.
					</Typography>
				</div>
			</div>
		)
	}
}

const AddTranslation = withTranslation()(UIComponent)
const AddStyle = withStyles(cssClasses)(AddTranslation)
const Main = withTheme(AddStyle)
export default Main
