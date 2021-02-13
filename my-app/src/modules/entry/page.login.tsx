import {
	Button,
	Card,
	IconButton,
	InputAdornment,
	Link,
	TextField,
	TextFieldProps,
	Typography,
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import 'assets/styles/page.login.scss'
import { RootContext } from 'context/app-context-dom'
import { Formik, FormikProps, yupToFormErrors } from 'formik'
import { UserApiHandler } from 'http/api-handlers/user-api-handler'
import _ from 'lodash'
import React from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'
import { withRouter } from 'react-router'
import { RouteComponentProps } from 'react-router-dom'
import { routes } from 'routing/routes-config'
import { Subscription } from 'rxjs'
import * as yup from 'yup'
import { SelectLanguage } from './page.select-language'

const schema = yup.object().shape({
	loginName: yup.string().required('login-error-loginNameRequired'),
	password: yup.string().required('login-error-passwordRequired'),
})

interface IProps extends WithTranslation, RouteComponentProps {}
interface IFormData {
	loginName: string
	password: string
}
interface IState {
	showPassword: boolean
	currentScreen: 'default' | 'selectLanguage'
	subscriptions: Subscription[]
}
class Login_Root extends React.PureComponent<IProps, IState> {
	static contextType = RootContext
	context!: React.ContextType<typeof RootContext>
	formHandleSubmit = async () => {
		const ctx = this.context!
		const form = this.validator.current!
		const isValid = await this.validateForm()
		if (!isValid) return
		const result = this.userApiHandlers.doLogin({
			loginName: form.values.loginName,
			password: form.values.password,
		})
		result.subscribe({
			next: (res) => {
				if (res.result === 'auth-success') {
					ctx.auth.setToken(res.jwToken)
				}
				if (res.result === 'auth-failed') {
					console.log('yyy')
				}
			},
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			error: (err) => {
				console.log(err)
			},
		})
	}

	validateForm = async () => {
		const form = this.validator.current!
		try {
			await schema.validate(form.values, {
				abortEarly: false,
			})
			return true
		} catch (errors) {
			form.setErrors(yupToFormErrors(errors))
			return false
		}
	}

	formHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const form = this.validator.current!
		const target = e.currentTarget
		const path = target.name
		const errors = { ...form.errors }
		_.set(errors, path, undefined)
		form.setErrors(errors)
		form.handleChange(e)
	}
	commonTextFieldProps: TextFieldProps = {
		variant: 'outlined',
		size: 'small',
		FormHelperTextProps: {
			className: 'p-b-5',
			error: true,
		},
		fullWidth: true,
		onChange: this.formHandleChange,
	}
	defaultFormData: IFormData = {
		loginName: '',
		password: '',
	}

	visibilityToggle = () => (
		<InputAdornment position="end">
			<IconButton
				onClick={() =>
					this.setState({
						showPassword: !this.state.showPassword,
					})
				}
				onMouseDown={(e) => e.preventDefault()}
			>
				{this.state.showPassword ? <Visibility /> : <VisibilityOff />}
			</IconButton>
		</InputAdornment>
	)
	validator: React.RefObject<FormikProps<IFormData>> = React.createRef()
	userApiHandlers: UserApiHandler = new UserApiHandler()
	constructor(props: IProps) {
		super(props)
		this.state = {
			showPassword: false,
			currentScreen: 'default',
			subscriptions: [],
		}
	}

	componentDidMount() {
		const ctx = this.context!
		this.state.subscriptions.push(
			ctx.entryModule.switchScreenChannel.subscribe({
				next: (val) => {
					this.setState({
						currentScreen: val,
						showPassword: false,
					})
				},
			})
		)
	}

	componentWillUnmount() {
		this.state.subscriptions.forEach((sub) => sub.unsubscribe())
	}

	render() {
		const { t, history } = this.props
		return (
			<React.Fragment>
				<Card
					className="pos-relative login-card perfect-centered p-t-35 p-b-35 p-l-15 p-r-15"
					data-whitealphabackground
					raised
				>
					{this.state.currentScreen === 'default' && (
						<Formik
							validateOnChange={false}
							validateOnBlur={false}
							initialValues={this.defaultFormData}
							validationSchema={schema}
							onSubmit={() => {}}
							innerRef={this.validator}
						>
							{(formikProps: FormikProps<IFormData>) => {
								const { values, errors } = formikProps
								return (
									<React.Fragment>
										<Typography variant="h6" paragraph align="center" className="m-t-auto">
											{t('login-label-pageName')}
										</Typography>
										<TextField
											{...this.commonTextFieldProps}
											label={t('login-label-loginName')}
											id="LoginPage_loginName"
											name="loginName"
											helperText={!_.isEmpty(errors.loginName) ? t(errors.loginName!) : ' '}
											error={!_.isEmpty(errors.loginName)}
											value={values.loginName}
										/>
										<div className="m-t-5"></div>
										<TextField
											{...this.commonTextFieldProps}
											label={t('login-label-password')}
											id="LoginPage_password"
											name="password"
											helperText={!_.isEmpty(errors.password) ? t(errors.password!) : ' '}
											error={!_.isEmpty(errors.password)}
											InputProps={{
												endAdornment: this.visibilityToggle(),
											}}
											type={this.state.showPassword ? 'text' : 'password'}
											value={values.password}
										/>
										<div className="m-t-20"></div>
										<Button fullWidth variant="outlined" size="large" onClick={this.formHandleSubmit}>
											{t('login-label-submitSignIn')}
										</Button>
										<Typography align="center">
											<Link className="hov-pointer" onClick={() => history.push(routes.forgotPassword)}>
												{t('login-label-forgotPassword')}
											</Link>
										</Typography>
										<Typography align="center" variant="caption" component="p" color="textSecondary">
											<Link
												className="hov-pointer"
												onClick={() =>
													this.setState({
														currentScreen: 'selectLanguage',
													})
												}
												color="inherit"
											>
												{t('login-label-selectLanguage')}
											</Link>
										</Typography>
									</React.Fragment>
								)
							}}
						</Formik>
					)}
					{this.state.currentScreen === 'selectLanguage' && <SelectLanguage></SelectLanguage>}
				</Card>
			</React.Fragment>
		)
	}
}

const WithRouter = withRouter(Login_Root)
const Login = withTranslation(undefined, { withRef: true })(WithRouter)
export { Login }
