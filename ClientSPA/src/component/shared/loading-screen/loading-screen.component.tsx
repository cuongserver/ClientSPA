/**import from core */
import React from 'react'
/**import 3rd party library */
import { Modal, LinearProgress } from '@material-ui/core'
/**import from inside project */
import 'component/shared/loading-screen/loading-screen.scss'
import { StoreStateApp } from 'types/store.app'
import { StoreStateLoading } from 'types/store.loading'
import { connect } from 'react-redux'

/**class declare */
class LoadingScreen extends React.PureComponent<StoreStateLoading> {
	render() {
		return (
			<Modal
				open={this.props.loading}
				BackdropProps={{
					className: 'common-backdrop',
				}}
			>
				<LinearProgress
					color="primary"
					variant="indeterminate"
				></LinearProgress>
			</Modal>
		)
	}
}

/**HOC */
const mapStateToProps = (state: StoreStateApp) => ({
	...state.loading,
})

export default connect(mapStateToProps)(LoadingScreen)
