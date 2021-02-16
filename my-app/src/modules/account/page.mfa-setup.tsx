import React from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Button, TextField } from '@material-ui/core'
import { UserApiHandler } from 'http/api-handlers/user-api-handler'
import { RootContext } from 'context/app-context-dom'

interface IProps extends RouteComponentProps, WithTranslation {}
interface IState {
	mfaKey: string
	pin: string
}
class MfaSetup_Root extends React.PureComponent<IProps, IState> {
	static contextType = RootContext
	context!: React.ContextType<typeof RootContext>
	constructor(props: IProps) {
		super(props)
		this.state = {
			mfaKey: '',
			pin: '',
		}
	}

	render() {
		return (
			<div>
				<Button variant="contained" onClick={this.handleClick}>
					Generate Mfa
				</Button>
				<div>
					<img id="mfaKeyQr" style={{ height: 150, width: 150, border: '1px solid' }}></img>
				</div>
				{this.state.mfaKey} - {this.state.pin}
				<div>
					<TextField variant="outlined" label="6 digit pin" onChange={this.handleChange}></TextField>
					<Button variant="contained" onClick={this.handleValidatePin}>
						Validate PIN
					</Button>
				</div>
			</div>
		)
	}

	handleClick = () => {
		const ctx = this.context!
		const img = document.getElementById('mfaKeyQr') as HTMLImageElement
		const apiHandler = new UserApiHandler()
		apiHandler
			.setHeader({ Authorization: ctx.auth.jwToken })
			.getMfaKey()
			.subscribe({
				next: (res) => {
					//qrcode.toCanvas(document.getElementById('mfaKeyQr') as HTMLCanvasElement, res.mfaKey)
					this.setState({
						mfaKey: res.mfaKey,
					})
					img.src = res.base64QrImageString
				},
			})
	}
	handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({
			pin: e.target.value,
		})
	}
	handleValidatePin = () => {
		const ctx = this.context!
		const apiHandler = new UserApiHandler()
		apiHandler
			.setHeader({ Authorization: ctx.auth.jwToken })
			.validatePin({ mfaKey: this.state.mfaKey, pin: this.state.pin })
			.subscribe({
				next: (res) => alert(res.result),
			})
	}
}

const AddRouter = withRouter(MfaSetup_Root)
const MfaSetup = withTranslation(undefined, { withRef: true })(AddRouter)
export { MfaSetup }
