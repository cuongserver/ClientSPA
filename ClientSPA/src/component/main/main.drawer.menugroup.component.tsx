import { List, ListItem, ListItemText, Collapse } from '@material-ui/core'
import React from 'react'
import { ExpandMore } from '@material-ui/icons'

interface DrawerMenuGroupProps {
	groupName: string
	groupNameTextVariant: 'primary' | 'secondary'
}

interface DrawerMenuGroupState {
	expanded: boolean
}

class DrawerMenuGroup extends React.PureComponent<
	DrawerMenuGroupProps,
	DrawerMenuGroupState
> {
	constructor(props: DrawerMenuGroupProps) {
		super(props)
		this.state = { expanded: false }
	}

	handleClick = () => {
		this.setState({
			expanded: !this.state.expanded,
		})
	}

	render() {
		return (
			<List>
				<ListItem button onClick={this.handleClick}>
					{this.props.groupNameTextVariant === 'primary' ? (
						<ListItemText primary={this.props.groupName} />
					) : null}
					{this.props.groupNameTextVariant === 'secondary' ? (
						<ListItemText secondary={this.props.groupName} />
					) : null}
					<ExpandMore
						style={{
							transform: this.state.expanded ? 'rotate(-180deg)' : '',
							transition: 'transform linear 0.2s',
						}}
					/>
				</ListItem>
				<Collapse in={this.state.expanded}>{this.props.children}</Collapse>
			</List>
		)
	}
}

export { DrawerMenuGroup }
