import { Card, CardContent, CardHeader, Checkbox } from '@material-ui/core'
import { RootContext } from 'context/app-context-dom'
import { RoleApiHandler } from 'http/api-handlers/role-api-handler'
import _ from 'lodash'
import React from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'

interface IProps extends WithTranslation {}
interface IState {
	availablePermissions: { [key: string]: string[] }
	selectedPermissions: { [key: string]: boolean }
}

class RoleAdd_Root extends React.PureComponent<IProps, IState> {
	static contextType = RootContext
	context!: React.ContextType<typeof RootContext>
	constructor(props: IProps) {
		super(props)
		this.state = {
			availablePermissions: {},
			selectedPermissions: {},
		}
	}
	componentDidMount() {
		const ctx = this.context!
		const apiHandler = new RoleApiHandler()
		apiHandler
			.setHeader({ Authorization: ctx.auth.jwToken })
			.getAllPermissionsForCreate()
			.subscribe({
				next: (res) => {
					this.setState((prevState) => {
						let newState = _.cloneDeep<IState>(prevState)
						newState.availablePermissions = res
						return newState
					})
				},
			})
	}

	render() {
		return (
			<div>
				{Object.keys(this.state.availablePermissions).map((key) => (
					<React.Fragment key={key}>
						{this.renderPermissionGroup(key, this.state.availablePermissions[key])}
					</React.Fragment>
				))}
				{JSON.stringify(this.state.selectedPermissions)}
			</div>
		)
	}
	renderPermissionGroup = (groupName: string, options: string[]) => {
		return (
			<Card raised className="m-t-5 m-b-5">
				<CardHeader title={groupName}></CardHeader>
				<CardContent>
					{options.map((option) => (
						<div key={option}>
							<Checkbox size="small" value={option} onChange={this.handleChange} /> {option}
						</div>
					))}
				</CardContent>
			</Card>
		)
	}
	handleChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
		const value = event.target.value
		this.setState((prevState) => {
			let newState = _.cloneDeep<IState>(prevState)
			newState.selectedPermissions[value] = checked
			return newState
		})
	}
}

const RoleAdd = withTranslation(undefined, { withRef: true })(RoleAdd_Root)
export { RoleAdd }
