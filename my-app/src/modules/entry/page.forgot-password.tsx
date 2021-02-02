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
	// InputAdornment,
	// InputProps,
	// IconButton,
	// //Radio,
	// PaletteType,
} from '@material-ui/core'
import 'assets/styles/page.forgot-password.scss'
import { withRouter } from 'react-router'
import { RouteComponentProps } from 'react-router-dom'
import { routes } from 'routing/routes-config'
import * as yup from 'yup'
import { Formik, FormikProps, yupToFormErrors } from 'formik'
import _ from 'lodash'

interface IProps extends WithTranslation, RouteComponentProps {}
interface IFormData {
	email: string
}
const schema = yup.object().shape({
	email: yup
		.string()
		.required('forgotPassword-error-emailRequired')
		.email('forgotPassword-error-emailInvalid'),
})
class ForgotPassword_Root extends React.PureComponent<IProps> {
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
	validator: React.RefObject<FormikProps<IFormData>> = React.createRef()
	defaultFormData: IFormData = {
		email: '',
	}
	render() {
		const { t, history } = this.props
		return (
			<React.Fragment>
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
								className="pos-relative perfect-centered p-t-35 p-b-35 p-l-15 p-r-15 forgotpassword-card"
								data-whitealphabackground
								raised
							>
								<Typography
									variant="h6"
									paragraph
									align="center"
									className="m-t-auto"
								>
									{t('forgotPassword-label-pageName')}
								</Typography>
								<TextField
									{...this.commonTextFieldProps}
									label={t('forgotPassword-label-email')}
									id="ForgotPasswordPage_email"
									name="email"
									helperText={!_.isEmpty(errors.email) ? t(errors.email!) : ' '}
									error={!_.isEmpty(errors.email)}
									value={values.email}
								/>
								<div className="m-t-20"></div>
								<Button
									fullWidth
									variant="outlined"
									size="large"
									onClick={this.formHandleSubmit}
								>
									{t('forgotPassword-label-sendEmail')}
								</Button>
								<Typography align="center">
									<Link
										className="hov-pointer"
										onClick={() => history.push(routes.login)}
									>
										{t('forgotPassword-label-backToLogin')}
									</Link>
								</Typography>
							</Card>
						)
					}}
				</Formik>
			</React.Fragment>
		)
	}
}

const WithRouter = withRouter(ForgotPassword_Root)

const ForgotPassword = withTranslation(undefined, { withRef: true })(WithRouter)
export { ForgotPassword }
