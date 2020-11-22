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
} from '@material-ui/core'
import { Inbox, Mail, ExpandLess, ExpandMore } from '@material-ui/icons'

class Main extends React.PureComponent<{}, { open: boolean }> {
	constructor(props: {}) {
		super(props)
		this.state = {
			open: false,
		}
	}

	handleClick = () => {
		this.setState({
			open: !this.state.open,
		})
	}

	render() {
		return (
			<div className="App">
				<AppBar position="fixed">
					<Toolbar>
						<Typography variant="h6" noWrap>
							Clipped drawer
						</Typography>
					</Toolbar>
				</AppBar>
				<Drawer variant="persistent" open={true}>
					<Toolbar />
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
