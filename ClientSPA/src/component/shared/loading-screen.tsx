/**import from core */
import React from 'react'
/**import 3rd party library */
import { Modal, LinearProgress } from '@material-ui/core'
/**import from inside project */
import 'component/shared/loading-screen.scss'
import * as LoadingScreenModel from 'store/loading-screen/loading-screen.store.model'
import { AppState } from 'store/base'
import { connect } from 'react-redux'

/**class declare */
class LoadingScreen extends React.PureComponent<LoadingScreenModel.State> {
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
const mapStateToProps = (state: AppState) => ({
	...state.loadingScreen,
})

export default connect(mapStateToProps, {})(LoadingScreen)
