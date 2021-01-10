import React from 'react'
import { WithTranslation, withTranslation } from 'react-i18next'
import { Formik, FormikProps, yupToFormErrors } from 'formik'
import {
	Button,
	TextField,
	TextFieldProps,
	InputAdornment,
	IconButton,
	InputProps,
	Typography,
	Link,
} from '@material-ui/core'
import _ from 'lodash'
import * as yup from 'yup'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { UserApiService } from 'api/api.user'
import { AddMemberRequest, AddMemberResult } from 'types/dto.user'
import { actionCreatorsAlert } from 'store/action-creators/action-creators.alert'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

interface IFormData {
	userName: string
	password: string
	confirmPassword: string
}

interface IProps extends WithTranslation {
	dispatch: Dispatch
}
type IState = {
	showHiddenText: {
		[key in keyof IFormData]: boolean
	}
	successLayoutProps: {
		newUsername: string
		showSuccess: boolean
	}
}

const initFormData: IFormData = {
	userName: '',
	password: '',
	confirmPassword: '',
}

const schema = yup.object().shape({
	userName: yup
		.string()
		.required('addmember-error-username-required')
		.matches(
			new RegExp('^[a-zA-Z0-9]{3,10}$'),
			'addmember-error-username-invalid'
		),
	password: yup.string().required('addmember-error-password-required'),
	confirmPassword: yup.string().when('password', {
		is: (val: string) => !_.isEmpty(val),
		then: yup
			.string()
			.oneOf(
				[yup.ref('password'), null],
				'addmember-error-password-cfm-unmatched'
			),
	}),
})

class AddMember_Origin extends React.PureComponent<IProps, IState> {
	validator: React.RefObject<FormikProps<IFormData>> = React.createRef()
	userApi: UserApiService = new UserApiService()
	constructor(props: IProps) {
		super(props)
		this.state = {
			showHiddenText: {
				userName: false,
				password: false,
				confirmPassword: false,
			},
			successLayoutProps: {
				newUsername: '',
				showSuccess: false,
			},
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

	formHandleSubmit = async () => {
		const form = this.validator.current!
		const { t, dispatch } = this.props
		try {
			await schema.validate(form.values, {
				abortEarly: false,
			})
			const request: AddMemberRequest = {
				userName: form.values.userName,
				password: form.values.password,
			}

			this.userApi.addMember(request).subscribe({
				next: (result) => {
					const data = result.data
					if (data.result === AddMemberResult.Success) {
						form.resetForm()
						this.setState({
							successLayoutProps: {
								newUsername: request.userName,
								showSuccess: true,
							},
						})
					} else {
						actionCreatorsAlert.showAlert(
							dispatch,
							t('api-message-addmember-' + data.result),
							'error'
						)
					}
				},
			})
		} catch (errors) {
			form.setErrors(yupToFormErrors(errors))
		}
	}

	handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
	}

	handleClickShowPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		const target = event.currentTarget
		const idx = target.getAttribute(
			'data-index'
		) as keyof IState['showHiddenText']
		this.setState({
			...this.state,
			showHiddenText: {
				...this.state.showHiddenText,
				[idx]: !this.state.showHiddenText[idx],
			},
		})
	}

	render() {
		const { t } = this.props
		const commonTextFieldProps: TextFieldProps = {
			variant: 'outlined',
			size: 'small',
			onChange: this.formHandleChange,
			FormHelperTextProps: {
				className: 'p-b-5',
				error: true,
			},
		}
		return this.state.successLayoutProps.showSuccess ? (
			this.successLayout()
		) : (
			<Formik
				innerRef={this.validator}
				validateOnChange={false}
				validateOnBlur={false}
				initialValues={initFormData}
				validationSchema={schema}
				onSubmit={() => {}}
			>
				{(formikProps: FormikProps<IFormData>) => {
					const { values, errors } = formikProps
					return (
						<React.Fragment>
							<div>
								<TextField
									{...commonTextFieldProps}
									id="addMember_Username"
									label={t('addmember-label-username')}
									name="userName"
									value={values.userName}
									error={!_.isEmpty(errors.userName)}
									helperText={
										!_.isEmpty(errors.userName) ? t(errors.userName!) : ' '
									}
								/>
							</div>
							<div>
								<TextField
									{...commonTextFieldProps}
									id="addMember_Password"
									label={t('addmember-label-password')}
									name="password"
									value={values.password}
									error={!_.isEmpty(errors.password)}
									helperText={
										!_.isEmpty(errors.password) ? t(errors.password!) : ' '
									}
									InputProps={this.inputAdornment('password')}
								/>
							</div>
							<div>
								<TextField
									{...commonTextFieldProps}
									id="addMember_ConfirmPassword"
									label={t('addmember-label-password-cfm')}
									name="confirmPassword"
									value={values.confirmPassword}
									error={!_.isEmpty(errors.confirmPassword)}
									helperText={
										!_.isEmpty(errors.confirmPassword)
											? t(errors.confirmPassword!)
											: ' '
									}
									InputProps={this.inputAdornment('confirmPassword')}
								/>
							</div>
							<div>
								<Button
									variant="contained"
									color="primary"
									onClick={this.formHandleSubmit}
								>
									{t('addmember-label-create-button')}
								</Button>
							</div>
						</React.Fragment>
					)
				}}
			</Formik>
		)
	}

	successLayout = () => {
		const { t } = this.props
		return (
			<React.Fragment>
				<Typography color="textPrimary">
					{t('api-message-addmember-0')}: &nbsp;
					<Typography color="secondary" component="span">
						{this.state.successLayoutProps.newUsername}
					</Typography>
					<br />
					<Link
						className="hov-pointer"
						color="primary"
						onClick={() => {
							this.setState({
								successLayoutProps: {
									newUsername: '',
									showSuccess: false,
								},
							})
						}}
					>
						{t('addmember-label-add-another')}
					</Link>
				</Typography>
			</React.Fragment>
		)
	}

	inputAdornment = (name: keyof IState['showHiddenText']): InputProps => {
		return {
			endAdornment: (
				<InputAdornment position="end">
					<IconButton
						onClick={this.handleClickShowPassword}
						onMouseDown={this.handleMouseDownPassword}
						data-index={name}
					>
						{(this.state.showHiddenText[name] as boolean) ? (
							<Visibility />
						) : (
							<VisibilityOff />
						)}
					</IconButton>
				</InputAdornment>
			),
			type: this.state.showHiddenText[name] ? undefined : 'password',
		}
	}
}
const AddMember_WithTranslation = withTranslation(undefined, { withRef: true })(
	AddMember_Origin
)
const AddMember = connect(null, null, null, { forwardRef: true })(
	AddMember_WithTranslation
)
export default AddMember
