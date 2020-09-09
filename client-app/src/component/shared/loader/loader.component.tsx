/**import from core */
import React from 'react'
/**import 3rd party library */
import { Modal, LinearProgress } from '@material-ui/core'
/**import from inside project */
import 'component/shared/loader/loader.scss'
import * as LoaderState from 'store/loader/state'
import { AppState } from 'store/common'
import { connect } from 'react-redux'

/**class declare */
class LoadingScreen extends React.PureComponent<LoaderState.State> {
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
	...state.loader,
})

export default connect(mapStateToProps)(LoadingScreen)
