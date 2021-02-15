import { Card, CardContent, CardHeader, Checkbox, CircularProgress, Link, Typography } from '@material-ui/core'
import { RootContext } from 'context/app-context-dom'
import { RoleApiHandler } from 'http/api-handlers/role-api-handler'
import { RoleDetailsResponse } from 'http/dto/role'
import React from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'
import { RouteComponentProps, withRouter } from 'react-router-dom'

interface RouteParamsProps {
	roleId: string
}
interface IState extends RoleDetailsResponse {
	loading: boolean
}

interface IProps extends WithTranslation, RouteComponentProps<RouteParamsProps> {}

class RoleDetails_Root extends React.PureComponent<IProps, IState> {
	static contextType = RootContext
	context!: React.ContextType<typeof RootContext>
	constructor(props: IProps) {
		super(props)
		this.state = {
			id: null,
			name: null,
			claims: null,
			loading: true,
		}
	}
	componentDidMount() {
		this.fetchData()
	}
	render() {
		const roleId = this.props.match.params.roleId
		return (
			<div>
				<Typography variant="h5" color="secondary">
					{roleId}
				</Typography>
				<React.Fragment>
					{this.state.loading && <CircularProgress />}
					{!this.state.loading && (
						<React.Fragment>
							{this.state.id === null && (
								<Typography color="textSecondary">
									Content not found,{' '}
									<Link color="primary" onClick={this.fetchData}>
										click here
									</Link>{' '}
									to try loading again
								</Typography>
							)}
							{this.state.id !== null && (
								<React.Fragment>
									<Typography variant="h6" color="textSecondary">
										{this.state.name}
									</Typography>
									{this.state.claims !== null
										? Object.keys(this.state.claims).map((key, idx) => {
												return (
													<React.Fragment key={idx}>
														{this.renderPermissionGroup(key, (this.state.claims as { [key: string]: string[] })[key])}
													</React.Fragment>
												)
										  })
										: null}
								</React.Fragment>
							)}
						</React.Fragment>
					)}
				</React.Fragment>
			</div>
		)
	}
	renderPermissionGroup = (groupName: string, options: string[]) => {
		return (
			<Card raised className="m-t-5 m-b-5">
				<CardHeader title={groupName}></CardHeader>
				<CardContent className="flex-w">
					{options.map((option) => (
						<div key={option}>
							<Checkbox size="small" checked /> {option}
						</div>
					))}
				</CardContent>
			</Card>
		)
	}
	fetchData = () => {
		const ctx = this.context!
		const roleId = this.props.match.params.roleId
		const apiHandler = new RoleApiHandler()
		this.setState(
			{
				loading: true,
			},
			() => {
				apiHandler
					.setHeader({ Authorization: ctx.auth.jwToken })
					.viewRoleById(roleId)
					.subscribe({
						next: (res) =>
							this.setState({
								...res,
								loading: false,
							}),
					})
			}
		)
	}
}

const AddRouter = withRouter(RoleDetails_Root)
const RoleDetails = withTranslation(undefined, { withRef: true })(AddRouter)
export { RoleDetails }
