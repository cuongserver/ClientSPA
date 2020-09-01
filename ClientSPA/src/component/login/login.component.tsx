/**import from core */
import React from 'react'

/**import 3rd party library */
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
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Formik, FormikProps, FormikErrors } from 'formik'
import { withRouter } from 'react-router'

/**import from inside project */
import { AppState } from 'model/store-model'
import * as AlertModel from 'model/store-model/alert'
import * as LocaleModel from 'model/store-model/locale'
import * as LoadingScreenModel from 'model/store-model/loading-screen'
import * as IndentityModel from 'model/store-model/identity'
import { GeneralModel } from 'model/common'
import background from 'asset/image/login-background.jpg'
import {
	IComponentProps,
	IComponentState,
	ILogin,
	IRecoverPassword,
} from 'component/login/login.model'
import 'component/login/login.scss'

/**class declare */
class Login extends React.PureComponent<IComponentProps, IComponentState> {
	/**field */
	initialLogin: ILogin = {
		username: '',
		password: '',
	}
	initialRecoverPassword: IRecoverPassword = {
		usernameForPasswordRecovery: '',
	}
	loginValidator: React.RefObject<FormikProps<ILogin>>
	recoverPasswordValidator: React.RefObject<FormikProps<IRecoverPassword>>
	/**life cycle hook */
	constructor(props: IComponentProps) {
		super(props)
		this.state = {
			mode: 'login',
			showPassword: false,
		}
		this.loginValidator = React.createRef()
		this.recoverPasswordValidator = React.createRef()
		console.log(this.props)
	}

	/**event handler */
	changeLanguage = (e: React.MouseEvent): void => {
		const target = e.currentTarget
		const newLang = target.getAttribute('alt') as string
		if (this.props.currentLang === newLang) return
		LocaleModel.actionCreators.changeLanguage(this.props.dispatch, newLang)
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

	loginHandleClick = () => {
		AlertModel.actionCreators.hideAlert(this.props.dispatch)
		LoadingScreenModel.actionCreators.activateLoader(this.props.dispatch, true)
		setTimeout(() => {
			LoadingScreenModel.actionCreators.activateLoader(
				this.props.dispatch,
				false
			)

			AlertModel.actionCreators.showAlert(
				this.props.dispatch,
				new Date().toJSON(),
				'success'
			)
			IndentityModel.actionCreators.login(this.props.dispatch)

			const redirectURL = this.props.location.state?.from
			if (redirectURL !== undefined) {
				this.props.history.push(redirectURL)
			} else {
				this.props.history.push('/login')
			}
		}, 2000)
	}

	loginHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const target = e.target
		const validator = this.loginValidator
		if (
			validator.current?.errors &&
			(validator.current?.errors as GeneralModel)[target.name]
		) {
			const err = validator.current?.errors as GeneralModel
			validator.current?.setErrors({
				...err,
				[target.name]: undefined,
			})
		}
		validator.current?.handleChange(e)
	}

	recoverPasswordHandleClick = () => {
		this.recoverPasswordValidator.current
			?.validateForm()
			.then((value) => console.log(value))
	}

	recoverPasswordHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const target = e.target
		const validator = this.recoverPasswordValidator
		if (
			validator.current?.errors &&
			(validator.current?.errors as GeneralModel)[target.name]
		) {
			const err = validator.current?.errors as GeneralModel
			validator.current?.setErrors({
				...err,
				[target.name]: undefined,
			})
		}
		validator.current?.handleChange(e)
	}

	/**ordinary function */

	loginValidateForm = (values: ILogin): Promise<FormikErrors<ILogin>> => {
		let err: FormikErrors<ILogin> = {}
		if (values.username === '' || values.username === null)
			err.username = 'login-error-username-required'
		if (values.password === '' || values.password === null)
			err.password = 'login-error-password-required'
		return Promise.resolve(err)
	}

	recoverPasswordValidateForm = (
		values: IRecoverPassword
	): Promise<FormikErrors<IRecoverPassword>> => {
		let err: FormikErrors<IRecoverPassword> = {}
		if (
			values.usernameForPasswordRecovery === '' ||
			values.usernameForPasswordRecovery === null
		)
			err.usernameForPasswordRecovery =
				'login-error-username-for-password-recover-required'
		return Promise.resolve(err)
	}

	/**render function */
	layoutLogin(): JSX.Element {
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
			<Formik
				initialValues={this.initialLogin}
				onSubmit={(values, actions) => console.log({ values, actions })}
				validate={this.loginValidateForm}
				innerRef={this.loginValidator}
				validateOnChange={false}
			>
				{(props: FormikProps<ILogin>) => (
					<React.Fragment>
						<TextField
							id="login-username"
							label={t('login-label-username')}
							variant="outlined"
							fullWidth
							size="small"
							name="username"
							value={props.values.username}
							onChange={this.loginHandleChange}
							helperText={
								props.errors.username !== undefined
									? t(props.errors.username)
									: ' '
							}
							FormHelperTextProps={{
								className: 'p-b-5',
								error: true,
							}}
							error={props.errors.username !== undefined}
						/>
						<TextField
							id="login-password"
							label={t('login-label-password')}
							variant="outlined"
							fullWidth
							size="small"
							name="password"
							type={this.state.showPassword ? 'text' : 'password'}
							value={props.values.password}
							onChange={this.loginHandleChange}
							InputProps={passwordInputProps}
							helperText={
								props.errors.password !== undefined
									? t(props.errors.password)
									: ' '
							}
							FormHelperTextProps={{
								className: 'p-b-5',
								error: true,
							}}
							error={props.errors.password !== undefined}
						/>
						<Button
							variant="contained"
							color="primary"
							size="large"
							fullWidth
							onClick={this.loginHandleClick}
						>
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
				)}
			</Formik>
		)
	}

	layoutRecoverPassword = (): JSX.Element => {
		const { t } = this.props
		return (
			<Formik
				initialValues={this.initialRecoverPassword}
				onSubmit={(values, actions) => console.log({ values, actions })}
				validate={this.recoverPasswordValidateForm}
				innerRef={this.recoverPasswordValidator}
				validateOnChange={false}
			>
				{(props: FormikProps<IRecoverPassword>) => (
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
							value={props.values.usernameForPasswordRecovery}
							onChange={this.recoverPasswordHandleChange}
							helperText={
								props.errors.usernameForPasswordRecovery !== undefined
									? t(props.errors.usernameForPasswordRecovery)
									: ' '
							}
							FormHelperTextProps={{
								className: 'p-b-5',
								error: true,
							}}
							error={props.errors.usernameForPasswordRecovery !== undefined}
						/>
						<Button
							variant="contained"
							color="primary"
							size="large"
							fullWidth
							onClick={this.recoverPasswordHandleClick}
						>
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
				)}
			</Formik>
		)
	}

	render() {
		const { t } = this.props

		const classList = {
			root: 'login-card flex-col-c-m p-l-10 p-r-10',
		}

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

						{this.state.mode === 'login' ? this.layoutLogin() : null}
						{this.state.mode === 'passwordRecovery'
							? this.layoutRecoverPassword()
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

/**HOC */
const LoginWithTranslation = withRouter(withTranslation()(Login))
const mapStateToProps = (state: AppState) => ({
	...state.locale,
	alertOpen: state.alert.open,
})
const LoginWithStore = connect(mapStateToProps)(LoginWithTranslation)
const LoginHoc = () => {
	return (
		<React.Suspense fallback="">
			<LoginWithStore />
		</React.Suspense>
	)
}

export default LoginHoc
