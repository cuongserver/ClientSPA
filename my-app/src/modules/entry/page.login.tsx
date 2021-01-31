import React from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'
import {
	Card,
	TextField,
	TextFieldProps,
	Typography,
	Button,
	Link,
	// Divider,
	// Typography,
	// InputLabel,
	InputAdornment,
	// InputProps,
	IconButton,
	// //Radio,
	// PaletteType,
} from '@material-ui/core'
import { LayoutEntry } from 'layouts/layout.entry'
import 'assets/styles/page.login.scss'
import { withRouter } from 'react-router'
import { RouteComponentProps } from 'react-router-dom'
import { routes } from 'routing/routes-config'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import * as yup from 'yup'
import { Formik, FormikProps, yupToFormErrors } from 'formik'
import _ from 'lodash'

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
}
class Login_Root extends React.PureComponent<IProps, IState> {
	formHandleSubmit = async () => {
		const form = this.validator.current!
		try {
			await schema.validate(form.values, {
				abortEarly: false,
			})
		} catch (errors) {
			form.setErrors(yupToFormErrors(errors))
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

	constructor(props: IProps) {
		super(props)
		this.state = {
			showPassword: false,
		}
	}
	render() {
		const { t, history } = this.props
		return (
			<LayoutEntry>
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
							<Card
								className="pos-relative login-card perfect-centered p-t-35 p-b-35 p-l-15 p-r-15"
								data-whitealphabackground
								raised
							>
								<Typography
									variant="h6"
									paragraph
									align="center"
									className="m-t-auto"
								>
									{t('login-label-pageName')}
								</Typography>
								<TextField
									{...this.commonTextFieldProps}
									label={t('login-label-loginName')}
									id="LoginPage_loginName"
									name="loginName"
									helperText={
										!_.isEmpty(errors.loginName) ? t(errors.loginName!) : ' '
									}
									error={!_.isEmpty(errors.loginName)}
								/>
								<div className="m-t-5"></div>
								<TextField
									{...this.commonTextFieldProps}
									label={t('login-label-password')}
									id="LoginPage_password"
									name="password"
									helperText={
										!_.isEmpty(errors.password) ? t(errors.password!) : ' '
									}
									error={!_.isEmpty(errors.password)}
									InputProps={{
										endAdornment: this.visibilityToggle(),
									}}
									type={this.state.showPassword ? 'text' : 'password'}
									value={values.password}
								/>
								<div className="m-t-20"></div>
								<Button
									fullWidth
									variant="outlined"
									size="large"
									onClick={this.formHandleSubmit}
								>
									{t('login-label-submitSignIn')}
								</Button>
								<Typography align="center">
									<Link
										className="hov-pointer"
										onClick={() => history.push(routes.forgotPassword)}
									>
										{t('login-label-forgotPassword')}
									</Link>
								</Typography>
							</Card>
						)
					}}
				</Formik>
			</LayoutEntry>
		)
	}
}

const WithRouter = withRouter(Login_Root)
const Login = withTranslation(undefined, { withRef: true })(WithRouter)
export { Login }
