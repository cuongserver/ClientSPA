import { RootContext } from 'context/app-context-dom'
import { RoleApiHandler } from 'http/api-handlers/role-api-handler'
import { Role } from 'http/dto/role'
import _ from 'lodash'
import React from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { DataGrid, ColDef, BaseComponentProps } from '@material-ui/data-grid'
import { Link, TablePagination } from '@material-ui/core'
import { routes } from 'routing/routes-config'

interface IProps extends RouteComponentProps, WithTranslation {}
interface IState {
	data: Role[]
}

class RoleList_Root extends React.PureComponent<IProps, IState> {
	static contextType = RootContext
	context!: React.ContextType<typeof RootContext>
	constructor(props: IProps) {
		super(props)
		this.state = {
			data: [],
		}
	}
	componentDidMount() {
		this.getRoleList()
	}

	rows = () => {
		return this.state.data.map((role) => role)
	}
	columns = (): ColDef[] => {
		return [
			{
				field: 'name',
				headerName: 'Role Name',
				headerAlign: 'center',
				renderCell: (params) => (
					<Link className="hov-pointer" data-roleid={params.row.id} onClick={this.showRole}>
						{params.row.name}
					</Link>
				),
				width: 200,
			},
		]
	}
	getRoleList = () => {
		const ctx = this.context!
		const apiHandler = new RoleApiHandler()
		apiHandler
			.setHeader({ Authorization: ctx.auth.jwToken })
			.getAll()
			.subscribe({
				next: (res) => {
					this.setState((prevState) => {
						const newState = _.cloneDeep<IState>(prevState)
						newState.data = res.roles
						return newState
					})
				},
			})
	}

	Pagination = (props: BaseComponentProps) => {
		const { t } = this.props
		return (
			<TablePagination
				count={props.state.pagination.rowCount}
				page={props.state.pagination.page - 1}
				rowsPerPage={props.state.pagination.pageSize}
				onChangePage={(e, page) => {
					console.log(e)
					console.log(page)
				}}
				labelDisplayedRows={(paginationInfo) => {
					return t('pagination-resultToDisplay', {
						from: paginationInfo.from,
						to: paginationInfo.to,
						count: paginationInfo.count,
					})
				}}
				labelRowsPerPage={t('pagination-rowsPerPage')}
			/>
		)
	}
	render() {
		const { t } = this.props
		return (
			<div>
				<DataGrid
					rows={this.rows()}
					columns={this.columns()}
					autoHeight
					disableColumnMenu
					components={{}}
					pageSize={25}
					density="compact"
					localeText={{ footerRowSelected: (count) => <span>{t('footer-resultsSelected', { count })}</span> }}
				/>
			</div>
		)
	}

	showRole = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		const { history } = this.props
		const id = (e.target as HTMLElement).getAttribute('data-roleid')
		if (id === null) return
		history.push(`${routes.roleList}/${id}`)
	}
}

const AddRouter = withRouter(RoleList_Root)
const RoleList = withTranslation(undefined, { withRef: true })(AddRouter)
export { RoleList }
