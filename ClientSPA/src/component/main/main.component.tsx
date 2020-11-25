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
import { Image, Menu, Clear } from '@material-ui/icons'
import { DrawerMenuGroup } from 'component/main/main.drawer.menugroup.component'
import { withTranslation, WithTranslation } from 'react-i18next'
import {
	createStyles,
	Theme,
	withStyles,
	WithStyles,
} from '@material-ui/core/styles'

const drawerWidth = 240
const cssClases = (theme: Theme) => {
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
	})
}

interface MainProps extends WithTranslation, WithStyles<typeof cssClases> {}

interface MainState {
	drawerOpen: boolean
}
class Main extends React.PureComponent<MainProps, MainState> {
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

	render() {
		const { classes } = this.props
		return (
			<div className="dis-flex">
				<AppBar position="fixed" className="elevation-appbar">
					<Toolbar disableGutters={true}>
						<div className="p-l-10 p-r-5" style={{ width: '63px' }}>
							{this.state.drawerOpen ? null : (
								<IconButton onClick={this.toggleDrawer} color="inherit">
									<Menu />
								</IconButton>
							)}
						</div>
						<Typography variant="h6" noWrap>
							Clipped drawer
						</Typography>
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
				<main
					className={`${
						this.state.drawerOpen ? classes.contentShift : classes.content
					} ${classes.content}`}
				>
					<div style={{ height: '64px' }} />
					<Typography paragraph>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
						dolor purus non enim praesent elementum facilisis leo vel. Risus at
						ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
						rutrum quisque non tellus. Convallis convallis tellus id interdum
						velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean
						sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
						integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
						eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
						quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
						vivamus at augue. At augue eget arcu dictum varius duis at
						consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
						donec massa sapien faucibus et molestie ac.
					</Typography>
					<Typography paragraph>
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
				</main>
			</div>
		)
	}
}

export default withStyles(cssClases)(withTranslation()(Main))
