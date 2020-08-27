import React from 'react'
import {
	Card,
	TextField,
	Button,
	Link,
	Divider,
	Typography,
	InputLabel,
	InputAdornment,
	InputProps,
	IconButton,
} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import 'component/login/login.scss'
import { WithTranslation, withTranslation } from 'react-i18next'
import background from 'asset/image/login-background.jpg'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState, AppAction } from 'model/base'
import * as LocaleModel from 'model/locale'

import { Formik } from 'formik'

interface IComponentProps extends WithTranslation, LocaleModel.State {
	changeLanguage: (lang: string) => void
}

interface IComponentState {
	mode: string
	showPassword: boolean
}

interface Values {
	username: string
	password: string
}

class Login extends React.PureComponent<IComponentProps, IComponentState> {
	constructor(props: IComponentProps) {
		super(props)
		this.state = {
			mode: 'login',
			showPassword: false,
		}
	}

	changeLanguage = (e: React.MouseEvent): void => {
		const target = e.currentTarget
		const newLang = target.getAttribute('alt') as string
		this.props.changeLanguage(newLang)
	}
	handleClickShowPassword = () => {
		this.setState({
			showPassword: !this.state.showPassword,
		})
	}
	handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
	}

	changeMode = (): void => {
		if (this.state.mode === 'login') {
			this.setState({
				mode: 'passwordRecovery',
			})
		} else {
			this.setState({
				mode: 'login',
			})
		}
	}

	get layoutLogin(): JSX.Element {
		const { t } = this.props
		const passwordInputProps: InputProps = {
			endAdornment: (
				<InputAdornment position="end">
					<IconButton
						onClick={this.handleClickShowPassword}
						onMouseDown={this.handleMouseDownPassword}
					>
						{this.state.showPassword ? <Visibility /> : <VisibilityOff />}
					</IconButton>
				</InputAdornment>
			),
		}
		return (
			<React.Fragment>
				<TextField
					id="login-username"
					label={t('login-label-username')}
					variant="outlined"
					fullWidth
					size="small"
					name="username"
				/>
				<div className="m-t-20"></div>
				<TextField
					id="login-password"
					label={t('login-label-password')}
					variant="outlined"
					fullWidth
					size="small"
					name="password"
					type={this.state.showPassword ? 'text' : 'password'}
					InputProps={passwordInputProps}
				/>
				<div className="m-t-20"></div>
				<Button variant="contained" color="primary" size="large" fullWidth>
					{t('login-label-login-command')}
				</Button>
				<div className="m-t-10"></div>
				<Typography color="secondary">
					<Link
						color="inherit"
						underline="hover"
						className="hov-pointer"
						onClick={() => this.changeMode()}
					>
						{t('login-label-forgotpassword')}
					</Link>
				</Typography>
			</React.Fragment>
		)
	}

	get layoutRecoverPassword(): JSX.Element {
		const { t } = this.props
		return (
			<React.Fragment>
				<Typography variant="body1" style={{ fontWeight: 'bold' }}>
					{t('login-label-email-for-password-recover')}
				</Typography>
				<div className="m-t-10"></div>
				<TextField
					id="login-username-for-password-recover"
					label={t('login-label-username')}
					variant="outlined"
					fullWidth
					size="small"
					name="usernameForPasswordRecovery"
				/>
				<div className="m-t-20"></div>
				<Button variant="contained" color="primary" size="large" fullWidth>
					{t('login-label-recover-password-command')}
				</Button>
				<div className="m-t-10"></div>
				<Typography color="secondary">
					<Link
						color="inherit"
						underline="hover"
						className="hov-pointer"
						onClick={() => this.changeMode()}
					>
						{t('login-label-goback')}
					</Link>
				</Typography>
			</React.Fragment>
		)
	}

	render() {
		const { t } = this.props

		const classList = {
			root: 'login-card flex-col-c-m p-l-10 p-r-10',
		}

		// const component = (
		// 	<React.Fragment>
		// 		<div
		// 			className="no-margin-collapse sizefull flex-col-c-m"
		// 			style={{
		// 				background: `url("${background}") no-repeat fixed center`,
		// 			}}
		// 		>
		// 			<Card classes={classList} raised>
		// 				<div className="m-t-auto" />

		// 				{this.state.mode === 'login' ? this.layoutLogin : null}
		// 				{this.state.mode === 'passwordRecovery'
		// 					? this.layoutRecoverPassword
		// 					: null}

		// 				<div className="m-t-auto"></div>
		// 				<Divider orientation="horizontal" className="w-full" />
		// 				<div className="m-t-10"></div>
		// 				<Typography color="secondary">
		// 					<InputLabel>{t('login-label-available-language')}</InputLabel>
		// 				</Typography>
		// 				<div className="m-t-5"></div>
		// 				<div className="dis-flex">
		// 					<img
		// 						alt="en"
		// 						title="en"
		// 						src="/image/flag/uk.png"
		// 						onClick={this.changeLanguage}
		// 						height="32px"
		// 						width="32px"
		// 						className="p-t-1 p-b-1 p-l-1 p-r-1 hov-pointer login-lang-switch"
		// 					/>
		// 					<div className="m-l-5 m-r-5"></div>
		// 					<img
		// 						alt="vi"
		// 						title="vi"
		// 						src="/image/flag/vietnam.png"
		// 						onClick={this.changeLanguage}
		// 						height="32px"
		// 						width="32px"
		// 						className="p-t-1 p-b-1 p-l-1 p-r-1 hov-pointer login-lang-switch"
		// 					/>
		// 				</div>
		// 				<div className="m-t-10"></div>
		// 			</Card>
		// 		</div>
		// 	</React.Fragment>
		// )
		const component = (
			<React.Fragment>
				<div
					className="no-margin-collapse sizefull flex-col-c-m"
					style={{
						background: `url("${background}") no-repeat fixed center`,
					}}
				>
					<Card classes={classList} raised>
						<div className="m-t-auto" />

						{this.state.mode === 'login' ? this.layoutLogin : null}
						{this.state.mode === 'passwordRecovery'
							? this.layoutRecoverPassword
							: null}

						<div className="m-t-auto"></div>
						<Divider orientation="horizontal" className="w-full" />
						<div className="m-t-10"></div>
						<Typography color="secondary">
							<InputLabel>{t('login-label-available-language')}</InputLabel>
						</Typography>
						<div className="m-t-5"></div>
						<div className="dis-flex">
							<img
								alt="en"
								title="en"
								src="/image/flag/uk.png"
								onClick={this.changeLanguage}
								height="32px"
								width="32px"
								className="p-t-1 p-b-1 p-l-1 p-r-1 hov-pointer login-lang-switch"
							/>
							<div className="m-l-5 m-r-5"></div>
							<img
								alt="vi"
								title="vi"
								src="/image/flag/vietnam.png"
								onClick={this.changeLanguage}
								height="32px"
								width="32px"
								className="p-t-1 p-b-1 p-l-1 p-r-1 hov-pointer login-lang-switch"
							/>
						</div>
						<div className="m-t-10"></div>
					</Card>
				</div>
			</React.Fragment>
		)
		return component
	}
}

const LoginWithTranslation = withTranslation()(Login)

const mapStateToProps = (state: AppState) => ({
	...state.locale,
})

const mapDispatchToProps = (dispatch: Dispatch<AppAction<string>>) => ({
	changeLanguage: (lang: string) => {
		dispatch({ type: 'CHANGE_LANGUAGE', payload: lang, fromMiddleWare: false })
	},
})
const LoginWithStore = connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginWithTranslation)
const LoginHoc = () => {
	return (
		<React.Suspense fallback="">
			<LoginWithStore />
		</React.Suspense>
	)
}

export default LoginHoc
