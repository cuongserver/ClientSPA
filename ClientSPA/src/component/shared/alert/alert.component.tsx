/**import from core */
import React from 'react'
/**import 3rd party library */
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
/**import from inside project */
import { actionCreatorsAlert } from 'store/action-creators/action-creators.alert'
import { StoreStateApp } from 'types/store.app'
import { StoreStateAlert } from 'types/store.alert'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Slide, { SlideProps } from '@material-ui/core/Slide'

/**class declare */
class Alert extends React.PureComponent<
	StoreStateAlert & { dispatch: Dispatch }
> {
	handleClose = (e: React.SyntheticEvent | MouseEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return
		}
		console.log(e)
		actionCreatorsAlert.hideAlert(this.props.dispatch)
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
const mapStateToProps = (state: StoreStateApp) => ({
	...state.alert,
})
export default connect(mapStateToProps)(Alert)
