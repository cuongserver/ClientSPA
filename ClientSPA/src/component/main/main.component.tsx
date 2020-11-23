import React from 'react'
import {
	AppBar,
	Toolbar,
	Typography,
	List,
	Drawer,
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider,
	Collapse,
	IconButton,
} from '@material-ui/core'
import {
	Inbox,
	Mail,
	ExpandLess,
	ExpandMore,
	Menu,
	Clear,
} from '@material-ui/icons'

class Main extends React.PureComponent<
	{},
	{ open: boolean; toggleOpen: boolean }
> {
	constructor(props: {}) {
		super(props)
		this.state = {
			open: false,
			toggleOpen: false,
		}
	}

	handleClick = () => {
		this.setState({
			open: !this.state.open,
		})
	}

	toggleDrawer = () => {
		this.setState({
			toggleOpen: !this.state.toggleOpen,
		})
	}
	render() {
		return (
			<div className="App">
				<AppBar position="fixed" className="elevation-appbar">
					<Toolbar disableGutters={true}>
						<div className="p-l-10 p-r-5">
							<IconButton onClick={this.toggleDrawer} color="inherit">
								{this.state.toggleOpen ? null : <Menu />}
							</IconButton>
						</div>
						<Typography variant="h6" noWrap>
							Clipped drawer
						</Typography>
					</Toolbar>
				</AppBar>

				<Drawer
					variant="persistent"
					open={this.state.toggleOpen}
					PaperProps={{
						variant: 'elevation',
						className: 'elevation-drawer',
						style: { width: '240px' },
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
						<List>
							{['Inbox', 'Starred', 'Send email', 'Drafts'].map(
								(text, index) => (
									<ListItem button key={text}>
										<ListItemIcon>
											{index % 2 === 0 ? <Inbox /> : <Mail />}
										</ListItemIcon>
										<ListItemText primary={text} />
									</ListItem>
								)
							)}
						</List>
						<Divider />

						<List>
							<ListItem button onClick={this.handleClick}>
								<ListItemText primary="Inbox" />
								{this.state.open ? <ExpandLess /> : <ExpandMore />}
							</ListItem>

							<Collapse in={this.state.open}>
								{['All mail', 'Trash', 'Spam'].map((text, index) => (
									<ListItem button key={text}>
										<ListItemIcon>
											{index % 2 === 0 ? <Inbox /> : <Mail />}
										</ListItemIcon>
										<ListItemText primary={text} />
									</ListItem>
								))}
							</Collapse>
						</List>
					</div>
				</Drawer>
			</div>
		)
	}
}

export default Main
