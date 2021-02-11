import React from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'
import { RouteComponentProps, withRouter } from 'react-router-dom'

interface IProps extends RouteComponentProps, WithTranslation {}

class RoleList_Root extends React.PureComponent<IProps> {
	render() {
		return <div>Rolelist works</div>
	}
}

const AddRouter = withRouter(RoleList_Root)
const RoleList = withTranslation(undefined, { withRef: true })(AddRouter)
export { RoleList }
