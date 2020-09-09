/**import from core */
import React from 'react'
/**import 3rd party library */
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
/**import from inside project */
import * as AlertActions from 'store/alert/actions'
import * as AlertState from 'store/alert/state'
import { AppState } from 'store/common'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Slide, { SlideProps } from '@material-ui/core/Slide'

/**class declare */
class Alert extends React.PureComponent<
	AlertState.State & { dispatch: Dispatch }
> {
	handleClose = (e: React.SyntheticEvent | MouseEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return
		}
		console.log(e)
		AlertActions.actionCreators.hideAlert(this.props.dispatch)
	}

	transition = (props: SlideProps) => {
		const _props: SlideProps = {
			...props,
			direction: 'left',
		}
		return <Slide {..._props} />
	}
	render() {
		return (
			<Snackbar
				open={this.props.open}
				autoHideDuration={3000}
				onClose={this.handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				TransitionComponent={this.transition} //transition functional component must not be anonymous
				key={this.transition.name}
			>
				<MuiAlert
					severity={this.props.severity}
					elevation={6}
					variant="filled"
					onClose={this.handleClose}
				>
					{this.props.message}
				</MuiAlert>
			</Snackbar>
		)
	}
}

/**HOC */
const mapStateToProps = (state: AppState) => ({
	...state.alert,
})
export default connect(mapStateToProps)(Alert)
